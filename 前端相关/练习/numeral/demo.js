// Numeral.js 一个用于格式化和操作数字的JavaScript库。
// 数字可以被格式化为货币，百分比，时间，几个小数位数，千分位等等。 您也可以随时创建自定义格式。

const numeral = require('numeral');
const num = numeral(1023456).format('0 a'); //

console.log(num);
