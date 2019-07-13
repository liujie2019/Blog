"use strict";
function fn(num) {
    return "\u627E\u5230\u4E86" + num;
}
var num = 2;
var res = fn(num);
console.log(res);
// 可选参数的函数
function test(name, age) {
    var res = '';
    res = "\u627E\u5230\u4E86" + name;
    if (age) {
        res += age;
    }
    return res + "\u540C\u5B66";
}
console.log(test('lisi'));
console.log(test('lisi', 20));
