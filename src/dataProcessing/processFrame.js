const decodeFrame = require("./decodeFrame");
const insertLogs = require("../database/insertion").insertData;
const decodeAttributes = require("./decodeAttributes");
const checkIfDeviceExists = require("../database/selection").checkMacExists;
const insertNewDevice = require("../database/insertion").insertNewDevice;
insertNewDevice
const frameProcess = (mac, data) => {
  const parsedData = decodeFrame(data);
  insertLogs(mac, parsedData);
};

const identificationFrameProcess = (data) => {
  const mac = decodeAttributes.decodeMacAddress(data);
  const promise = new Promise((resolve, reject) => {
    checkIfDeviceExists(mac)
      .then((exists) => {
        if (!exists) {
          insertNewDevice(mac);
        }
        resolve();
      })
      .catch((err) => reject());
  });
  return promise.then(() => mac).catch((err) => -1);
};

module.exports = { frameProcess, identificationFrameProcess };
