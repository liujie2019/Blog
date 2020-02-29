console.log('a模块start');
exports.test = 1;
undeclaredVariable = 'a模块未声明变量';
const b = require('./b');
console.log('a模块加载完毕：b.test值：', b.test);
// 输出结果：
/*
a模块start
b模块start
undeclaredVariable: a模块未声明变量
b模块加载完毕：a.test值： 1
a模块加载完毕：b.test值： 2
*/