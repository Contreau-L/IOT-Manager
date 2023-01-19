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
  const macAddressBytes = data.slice(0, 6);
  return macAddressBytes
};

module.exports = { decodeMacAddress, getTypeOfFrame };
