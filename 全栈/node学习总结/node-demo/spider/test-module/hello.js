// 子模块
// arguments是函数内置的变量
// arguments.callee指向arguments所在的函数
// console.log(arguments.callee.toString());

/*
function (exports, require, module, __filename, __dirname) { // 子模块
// arguments是函数内置的变量
// arguments.callee指向arguments所在的函数
console.log(arguments.callee.toString());
}
*/

const username = 'lisi';
module.exports.username = username;