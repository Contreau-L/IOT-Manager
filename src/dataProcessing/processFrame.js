const decodeFrame = require('./decodeFrame');
const insertLogs = require('../database/insertion').insertData;
const processFrame = (mac, data) => {
    const parsedData = decodeFrame(data);
    insertLogs(mac, parsedData);
}

module.exports = {processFrame};

