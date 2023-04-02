function getAPIBaseUrl() {
    return process.env.API_URL + ":" + process.env.API_PORT + "/v1";
}
function getDeviceIdentificationUrl(deviceId, linesNumber) {
    return getAPIBaseUrl() + `/devices/${deviceId}/identification?` + new URLSearchParams({lines: linesNumber}).toString();
}

function getLogCreationUrl() {
    return getAPIBaseUrl() + `/logs`;
}

module.exports = { getDeviceIdentificationUrl, getLogCreationUrl}