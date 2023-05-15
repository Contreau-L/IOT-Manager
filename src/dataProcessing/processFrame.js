const decodeAttributes = require("./decodeAttributes");
const {logInsertion, deviceIdentification, postWateringStatus} = require("../api/services");
const {decodeWateringFrame,decodeFrame} = require("./decodeFrame");
const frameProcessing = (mac, data) => {
  const parsedData = decodeFrame(data);
  const logData = {
    device: mac,
    water_temperature: parsedData.waterTemperature,
    water_level: parsedData.waterLevel,
    occured_at: parsedData.occurredAt,
    ph: parsedData.phValue,
    humidity_values: parsedData.humiditySensorsValue
  }
  logInsertion(logData).then((logId) => console.log(`Inserted log with id ${logId}`))
};

const wateringFrameProcessing = (deviceId,data) => {
  const parsedData = decodeWateringFrame(data);
  let wateringResult = [];
  parsedData.wateringResult.forEach(element => {
    let action = {
      "id": deviceId,
      "status": element.status,
      "index": element.index,
      "occurred_at": parsedData.occurredAt
    }
    wateringResult.push(action);
  });
  console.log(wateringResult);
  postWateringStatus({actions : wateringResult}).then((response) => console.log(response)); 

}

const identificationFrameProcess = (data) => {
  const mac = decodeAttributes.decodeMacAddress(data);
  const numberOfHumiditySensors = decodeAttributes.decodeNumberOfHumiditySensors(data);
  return deviceIdentification(mac, numberOfHumiditySensors);
};






module.exports = { frameProcessing, identificationFrameProcess, wateringFrameProcessing };
