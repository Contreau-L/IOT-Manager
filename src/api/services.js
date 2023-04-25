const axios = require("axios");
const {getLogCreationUrl, getDeviceIdentificationUrl,getWateringInWaiting,getLinesThreshold} = require("./urls");

const logInsertion = (logData) => {
    return axios.post(getLogCreationUrl(), logData)
        .then((response) => response.data.id);
}

const deviceIdentification = (deviceId, linesNumber) => {
    return axios.post(getDeviceIdentificationUrl(deviceId, linesNumber))
        .then((response) => response.data.id);
}

const wateringInWaiting = (deviceId) => {
    return axios.get(getWateringInWaiting(deviceId))
        .then((response) => response.data);
}

const getLinesInfo = (deviceId) => {
    return axios.get(getLinesThreshold(deviceId))
        .then((response) => response.data);
}


module.exports = { logInsertion, deviceIdentification, wateringInWaiting, getLinesInfo};