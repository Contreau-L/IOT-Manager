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
    //check the type
    console.log("data : ", data); 
    const macAddress = data.readIntBE(0,6);
    console.log(`macAddressBytes: ${macAddress}`);
    return macAddress;
};

module.exports = { decodeMacAddress, getTypeOfFrame };
