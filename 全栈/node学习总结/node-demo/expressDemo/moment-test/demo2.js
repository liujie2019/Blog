const moment = require('moment');
moment.locale('zh-cn');
// console.log(moment(new Date()).format());
// console.log(moment.utc(new Date()));
// console.log(moment().fromNow());
// console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
console.log(moment().format("YYYY-MM-DD HH:mm:ss"));