decodeAttributes = require("./decodeAttributes");

const decodeFrame = (data) => {
  if (!(data instanceof Buffer)) {
    throw new Error("Data must be in binary format (Buffer)");
  }
  let parsedData = {};
  let obj = { offset: 1 };
  parsedData.numberOfHumiditySensors = readOneByte(data, obj);
  parsedData.humiditySensorsValue = [];
  let staticOffset = obj.offset;
  for (let i = obj.offset; i < parsedData.numberOfHumiditySensors + staticOffset; i++) {
    parsedData.humiditySensorsValue.push(readOneByte(data, obj));
  }

  parsedData.waterTemperature = readOneByte(data, obj);
  parsedData.waterLevel = readOneByte(data, obj);
  parsedData.phValue = readOneByte(data, obj);
  const minutes = readOneByte(data, obj);
  const hour = readOneByte(data, obj);
  const day = readOneByte(data, obj);
  const month = readOneByte(data, obj);
  const year = 2000+readOneByte(data, obj);

  parsedData.occurredAt = new Date(year, month, day, hour, minutes);

  return parsedData;
};

const readOneByte = (data, obj) => {
  const val = data.readUInt8(obj.offset);
  obj.offset += 1;
  return val;
};

module.exports = decodeFrame;
