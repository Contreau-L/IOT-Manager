function dateBuilder(year, month, day, hour, minutes) {
    let newDate = new Date();
    newDate.setHours(hour, minutes);
    newDate.setFullYear(year, month, day);
    return newDate;
}

module.exports = { dateBuilder }