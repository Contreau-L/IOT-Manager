const decodeFrame = require("./decodeFrame");
const insertLogs = require("../database/insertion").insertData;
const insertNewHumiditySensor = require("../database/insertion").insertNewHumiditySensor;
const decodeAttributes = require("./decodeAttributes");
const checkIfDeviceExists = require("../database/selection").checkMacExists;
const insertNewDevice = require("../database/insertion").insertNewDevice;

const frameProcess = (mac, data) => {
  const parsedData = decodeFrame(data);
  console.log("parsedData : ", parsedData);
  insertLogs(mac, parsedData).then((logId) =>
    console.log(`Inserted log with id ${logId}`)
  );
};

const identificationFrameProcess = (data) => {
  const mac = decodeAttributes.decodeMacAddress(data);
  const numberOfHumiditySensors = decodeAttributes.numberOfHumiditySensors(data);
  const promise = new Promise((resolve, reject) => {
    checkIfDeviceExists(mac)
      .then((exists) => {
        if (!exists) {
          let promises = [];
          insertNewDevice(mac)
          .then( () => {
            for(let i = 0; i < numberOfHumiditySensors; i++) {
              promises.push(insertNewHumiditySensor(mac));
            }
          });
        }
        resolve();
      })
      .catch((err) => reject());
  });
  return promise.then(() => mac).catch((err) => -1);
};

module.exports = { frameProcess, identificationFrameProcess };
