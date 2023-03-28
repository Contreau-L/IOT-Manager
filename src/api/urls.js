function getAPIBaseUrl() {
    return process.env.API_URL + ":" + process.env.API_PORT + "/v1";
}
function getDeviceIdentificationUrl(deviceId) {
    return getAPIBaseUrl() + `/devices/${deviceId}/identification`;
}

function getLogCreationUrl() {
    return getAPIBaseUrl() + `/logs`;
}

module.exports = { getDeviceIdentificationUrl, getLogCreationUrl}