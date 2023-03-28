const axios = require("axios");
const {getLogCreationUrl, getDeviceIdentificationUrl} = require("./urls");

function logInsertion(logData) {
    return axios.post(getLogCreationUrl(), logData)
        .then((response) => response.data.id);
}

function deviceIdentification(deviceId) {
    return axios.post(getDeviceIdentificationUrl(deviceId))
        .then((response) => response.data.id);
}

module.exports = { logInsertion, deviceIdentification};