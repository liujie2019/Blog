function formatUTC(UTCDateString) {
    if(!UTCDateString) {
      return '-';
    }
    function formatFunc(str) {    //格式化显示
      return str > 9 ? str : '0' + str
    }
    var date = new Date(UTCDateString); // 这步是关键
    var year = date.getFullYear();
    var mon = formatFunc(date.getMonth() + 1);
    var day = formatFunc(date.getDate());
    var hour = date.getHours();
    // var noon = hour >= 12 ? 'PM' : 'AM';
    // hour = hour >=12 ? hour-12 : hour;
    hour = formatFunc(hour);
    var min = formatFunc(date.getMinutes());
    var s = formatFunc(date.getSeconds());
    var dateStr = year + '-' + mon + '-' + day + ' '+ hour + ':'+ min + ':' + s;
    return dateStr;
}
// console.log(formatUTC('2019-05-18T06:21:31.323Z'));
// exports.formatUTC = formatUTC;