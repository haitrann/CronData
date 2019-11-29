module.exports = (dateTime) => {
    
    const temp = dateTime.split(' ');
    const d = temp[0].split('/');
    const t = temp[1].split(':');

    year = d[2];
    month = d[1];
    date = d[0];

    hour = t[0];
    min = t[1];

    const format = new Date(year, month, date, hour, min);
    return format;
    
};