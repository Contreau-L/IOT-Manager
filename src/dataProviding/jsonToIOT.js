const wateringInWaiting = require("../api/services").wateringInWaiting;
const getLinesInfo = require("../api/services").getLinesInfo;
const emptyActions = 0xff;
const getWateringForIOT = async (deviceId) => {
    const { actions } = await wateringInWaiting(deviceId);
    let array = [];
    for(let i = 0; i < actions.length; i++) {
        array.push(actions[i].index);
        array.push(actions[i].threshold);
    }
    if (actions.length == 0) {
        array.push(emptyActions);
    }
    const buffer = Buffer.from(array);
    return buffer;
}

const getLinesData = async (deviceId) => {
    const { thresholds } = await getLinesInfo(deviceId);
    let array = [];
    for(let i = 0; i < thresholds.length; i++) {
        array.push(i);
        array.push(thresholds[i]);
    }
    const buffer = Buffer.from(array);
    return buffer;
}


module.exports = { getWateringForIOT, getLinesData };
