const getTypeOfFrame = (data) => {
  let type;
  switch (data[0]) {
    case 0xff:
      type = "socketEnd";
      break;
    case 0x00:
      type = "data";
      break;
  }
  return type;
};

const decodeMacAddress = (data) => {
  const macAddress = data.readIntBE(0, 6);
  console.log("macAddress : ", macAddress.toString(16));
  return macAddress;
};

const decodeNumberOfHumiditySensors = (data) => {
    const numberOfHumiditySensors = data.readUint8(6);
    console.log("numberOfHumiditySensors : ", numberOfHumiditySensors);
    return numberOfHumiditySensors;
}

module.exports = { decodeMacAddress, getTypeOfFrame , decodeNumberOfHumiditySensors };
