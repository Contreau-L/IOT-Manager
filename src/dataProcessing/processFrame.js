const decodeFrame = require("./decodeFrame");
const decodeAttributes = require("./decodeAttributes");
const {logInsertion, deviceIdentification} = require("../api/services");

const frameProcessing = (mac, data) => {
  const parsedData = decodeFrame(data);
  console.log("parsedData : ", parsedData);
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

const identificationFrameProcess = (data) => {
  const mac = decodeAttributes.decodeMacAddress(data);
  const numberOfHumiditySensors = decodeAttributes.decodeNumberOfHumiditySensors(data);
  return deviceIdentification(mac, numberOfHumiditySensors);
};

module.exports = { frameProcessing, identificationFrameProcess };
