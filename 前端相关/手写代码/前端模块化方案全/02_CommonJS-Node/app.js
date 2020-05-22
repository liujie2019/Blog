/**
 * 暴露模块
 * module.exports = value
 * exports.xxx = value
 * 引入模块
 * var mnodule = require(模块名称或模块路径)
*/

const uniq = require('uniq');
const module1 = require('./modules/module1');
const module2 = require('./modules/module2');
const module3 = require('./modules/module3');

module1.foo();
module2();
module3.bar();
module3.foo();
console.log(uniq([1, 2, 2, 1, 1, 3, 11]));
