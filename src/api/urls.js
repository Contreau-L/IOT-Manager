const getAPIBaseUrl = () => {
    return process.env.API_URL + ":" + process.env.API_PORT + "/v1";
}
const getDeviceIdentificationUrl = (deviceId, linesNumber) => {
    return getAPIBaseUrl() + `/devices/${deviceId}/identification?` + new URLSearchParams({lines: linesNumber}).toString();
}

const getLogCreationUrl = () => {
    return getAPIBaseUrl() + `/logs`;
}

const getWateringInWaiting = (deviceId) => {
    return getAPIBaseUrl() + `/actions/${deviceId}/waiting`;
}

const getLinesThreshold = (deviceId) => {
    console.log(getAPIBaseUrl() + `/devices/${deviceId}/thresholds`);
    return getAPIBaseUrl() + `/devices/${deviceId}/thresholds`;
}

const getPostWateringStatusUrl = () => {
    return getAPIBaseUrl() + '/actions/status';
}
module.exports = { getDeviceIdentificationUrl, getLogCreationUrl, getWateringInWaiting,getLinesThreshold, getPostWateringStatusUrl}