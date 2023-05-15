const ACK = require("../utils/constant");

const getTypeOfFrame = (data) => {
  let type;
  console.log("data[0] : ", data[0]);

  switch (data[0]) {
    case 0xff:
      type = "endLogs";
      break;
    case ACK.charCodeAt(0):
      type = "goToNextInformation";
      break;
    case 0x00:
      type = "data";
      break;
    case 0x01:
      type = "wateringStatus";
      break;
  }
  return type;
};

const decodeMacAddress = (data) => {
  const macAddress = data.readUintBE(0, 6);
  console.log("macAddress : ", macAddress.toString(16));
  return macAddress;
};

const decodeNumberOfHumiditySensors = (data) => {
    const numberOfHumiditySensors = data.readUint8(6);
    console.log("numberOfHumiditySensors : ", numberOfHumiditySensors);
    return numberOfHumiditySensors;
}

module.exports = { decodeMacAddress, getTypeOfFrame , decodeNumberOfHumiditySensors };
