module.exports = (dateTime) => {
    const temp = dateTime.split(' ');
    const dateFormat = temp[0].split('/');
    const y = 20;
    if (dateFormat[2] === 99) {
        y++;
    }
    const year = `${y}${dateFormat[2]}`;
    const month = dateFormat[1];
    const date = dateFormat[0];

    const PM = temp[1].match('pm') ? true : false

    var time = temp[1].split(':');
    if (PM) {
        if (parseInt(time[0]) < 12) {
            var hour = 12 + parseInt(time[0],10);
        } else {
            var hour = '00';
        }

        var min = time[1].replace('pm', '');
    } else {
        var hour = time[0];
        var min = time[1].replace('am', '');
    }

    const format = new Date(year, month, date, hour, min);
    return format;

};