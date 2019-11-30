module.exports = (dateTime) => {
    
    const temp = dateTime.split(' ');
    const d = temp[0].split('/');
    const t = temp[1].split(':');

    let year = parseInt(d[2]);

    let month = parseInt(d[1])-1;

    let date = parseInt(d[0]);

    let hour = parseInt(t[0]);
    let min = parseInt(t[1]);

    const format = new Date(year, month, date, hour, min);
    return format;
    
};