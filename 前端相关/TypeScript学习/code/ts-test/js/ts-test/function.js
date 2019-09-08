"use strict";
// es5定义函数
// 函数声明
// function run() {
//     return 'run';
// }
// // 函数表达式
// let run2 = function() {
//     return 'run2';
// }
function getInfo(name, age) {
    if (age) {
        return "\u6211\u53EB" + name + ",\u6211\u7684\u5E74\u9F84\u662F" + age;
    }
    return "\u6211\u53EB" + name;
}
console.log(getInfo('lisi', 12)); // 我叫lisi,我的年龄是12
console.log(getInfo('lisi')); // 我叫lisi
