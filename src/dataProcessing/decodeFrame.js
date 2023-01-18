const FRAME_SIZE = 255;
decodeAttributes = require('./decodeAttributes');


const decodeFrame = (data) => {
    if (!(data instanceof Buffer)) {
        throw new Error('Data must be in binary format (Buffer)');
    }
    let parsedData = {};
    let offset = 0;
    parsedData.numberOfHumiditySensors = data[1];
    offset++;
    parsedData.humiditySensorsValue = [];
    for(let i = 1; i < parsedData.numberOfHumiditySensors; i++){
        parsedData.humiditySensorsValue.push(data[i+1]);
        offset++;
    }
    parsedData.temperatureValue = data[offset++];
    parsedData.waterLeveLValue = data[offset++];
    parsedData.phValue = data[offset++];


    parsedData.minutes = data[offset++]; 
    parsedData.hour = data[offset++]; 
    parsedData.day = data[offset++];
    parsedData.month = data[offset++];
    parsedData.year = data[offset++];

    return parsedData;
}


module.exports = decodeFrame;