const moment = require('moment');

const now = moment().format('YYYY-MM-DD HH:mm:ss');
// console.log(now); // 2019-08-23 11:15:59

// console.log(new Date().getTime());
// console.log(moment(new Date()).utc().unix()); // 1566530435

// console.log(moment().startOf('day'));
// console.log(moment().endOf('day'));

// console.log(moment().startOf('week'));

// console.log(moment().daysInMonth());

console.log(typeof moment().format('x')); // string
console.log(moment().unix()); // 1566530811