console.log('b模块start');
exports.test = 2;
const a = require('./a');
console.log('undeclaredVariable:', undeclaredVariable);
console.log('b模块加载完毕：a.test值：', a.test);