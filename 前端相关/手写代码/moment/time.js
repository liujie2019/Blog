const moment = require('moment');

// 获取当前时间
console.log(moment());
console.log(moment().unix());
// 依据unix时间戳创建时间
console.log(moment.unix(1566561090)); // moment("2019-08-23T19:51:30.000")

// 等价于
console.log(moment(new Date()));

console.log(moment('08-23-2019', 'MM-DD-YYYY')); // moment("2019-08-23T00:00:00.000")

console.log(moment().format('YYYY-Do-MMMM')); // 2019-23rd-August
console.log(moment().format('YYYY-DDD-MMMM')); // 2019-235-August
