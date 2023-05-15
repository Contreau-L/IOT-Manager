const {dateBuilder} = require("../utils/dateBuilder");
decodeAttributes = require("./decodeAttributes");

const decodeFrame = (data) => {
  if (!(data instanceof Buffer)) {
    throw new Error("Data must be in binary format (Buffer)");
  }
  let parsedData = {};
  let obj = { offset: 1 };
  parsedData.numberOfHumiditySensors = readOneByte(data, obj);
  parsedData.humiditySensorsValue = [];
  for (let i = 0; i < parsedData.numberOfHumiditySensors; i++) {
    parsedData.humiditySensorsValue.push(readOneByte(data, obj));
  }

  parsedData.waterTemperature = readTwoBytes(data, obj)/10;
  parsedData.waterLevel = readTwoBytes(data, obj)/10;
  parsedData.phValue = readOneByte(data, obj)/10;
  const day = readOneByte(data, obj);
  const month = readOneByte(data, obj)-1;
  const year = readTwoBytes(data, obj);
  const hour = readOneByte(data, obj);
  const minutes = readOneByte(data, obj);

  parsedData.occurredAt = dateBuilder(year, month, day, hour, minutes);
  return parsedData;
};

const decodeWateringFrame = (data) => {
  parsedData = {};
  let obj = { offset: 1 };
  const NB_HUMIDITY_SENSORS = readOneByte(data, obj);
  console.log("NB_HUMIDITY_SENSORS : ", NB_HUMIDITY_SENSORS);
  const day = readOneByte(data, obj);
  const month = readOneByte(data, obj)-1;
  const year = readTwoBytes(data, obj);
  const hour = readOneByte(data, obj);
  const minutes = readOneByte(data, obj);
  parsedData.occurredAt = dateBuilder(year, month, day, hour, minutes);
  parsedData.wateringResult = [];
  for(let i = 0 ; i < NB_HUMIDITY_SENSORS; i++){
      let lines = {};
      lines.index = i+1;
      if(readOneByte(data, obj) == 1){
        lines.status = true;
      } else {
        lines.status = false;
      }
      parsedData.wateringResult.push(lines);
  }
  console.log(parsedData);
  return parsedData;
  
}

const readOneByte = (data, obj) => {
  const val = data.readUInt8(obj.offset);
  obj.offset += 1;
  return val;
}
const readTwoBytes = (data,obj) => {
  const val = data.readUInt16BE(obj.offset);
  obj.offset += 2;
  return val;
}

module.exports =  {decodeFrame, decodeWateringFrame};

