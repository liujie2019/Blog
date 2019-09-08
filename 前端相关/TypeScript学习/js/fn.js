"use strict";
function fn(num) {
    return `找到了${num}`;
}
let num = 2;
let res = fn(num);
console.log(res);
// 可选参数的函数
function test(name, age) {
    let res = '';
    res = `找到了${name}`;
    if (age) {
        res += age;
    }
    return `${res}同学`;
}
console.log(test('lisi'));
console.log(test('lisi', 20));
