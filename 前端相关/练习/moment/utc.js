const moment = require('moment');

const time = moment().unix();
const time2 = moment().utc().unix();

// 带时区
// const time = moment(); // moment("2019-08-23T14:10:47.422")
// 不带时区
// const time2 = moment().utc(); // moment.utc("2019-08-23T06:10:47.423+00:00")
console.log(time);
console.log(time2);

// console.log(time2.hours()); // 3
// console.log(time.hours()); // 11
// time.utc();
// console.log(time.hours()); // 3

console.log(moment().millisecond());
console.log(moment.locale());