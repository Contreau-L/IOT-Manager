const decodeFrame = require("./decodeFrame");
const insertLogs = require("../database/insertion").insertLogs;
const insertNewHumiditySensor = require("../database/insertion").insertNewHumiditySensor;
const decodeAttributes = require("./decodeAttributes");
const insertConnectionHistory  = require("../database/insertion").insertConnectionHistory;
const checkIfDeviceExists = require("../database/selection").checkMacExists;
const insertNewDevice = require("../database/insertion").insertNewDevice;
const insertNewHumidityValue = require("../database/insertion").insertNewHumidityValue;

const frameProcessing = (mac, data) => {
  const parsedData = decodeFrame(data);
  console.log("parsedData : ", parsedData);
  insertLogs(mac, parsedData).then((logId) => {
    console.log(`Inserted log with id ${logId}`);
    let index = 0;
    parsedData.humiditySensorsValue.forEach(element => {
      insertNewHumidityValue(mac,index,logId,element);
    });
  });
};

const identificationFrameProcess = (data) => {
  const mac = decodeAttributes.decodeMacAddress(data);
  const numberOfHumiditySensors = decodeAttributes.decodeNumberOfHumiditySensors(data);
  const promise = new Promise((resolve, reject) => {
    checkIfDeviceExists(mac)
      .then(async (exists) => {
        if (!exists) {

          let promises = [];
          await insertNewDevice(mac);
          for(let i = 0; i < numberOfHumiditySensors; i++) {
            promises.push(insertNewHumiditySensor(mac,i));
          }
          await Promise.all(promises);
        }
        insertConnectionHistory(mac);
        resolve(mac);
      })
      .catch((err) => reject(err));
  });
  return promise;
};

module.exports = { frameProcessing, identificationFrameProcess };
