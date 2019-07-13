"use strict";
var age = 123;
console.log(age);
// 字符串
var str = '123';
// 布尔值
var a = true;
// 定义数组
// 方式1
var arr = [1, 2, 3];
console.log(arr);
// 方式2 使用数组泛型，Array<元素类型>
var arr2 = [1, 3, 5];
console.log(arr2);
// null 和 undefined
var n = null;
var test2;
console.log(test2);
// 枚举
// 默认情况从0开始为元素编号，也可手动为1开始
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
console.log(c); // 3
var colorName = Color[2];
console.log(colorName); // Green
var Gender;
(function (Gender) {
    Gender["nan"] = "\u7537";
    Gender["nv"] = "\u5973";
})(Gender || (Gender = {}));
console.log(Gender.nv);
// 元组
var tuple = [24, 'abc', true];
// any
var t = 100;
t = '字符串';
console.log(t);
// any类型的使用场景
var box = document.querySelector('.box');
box.style.color = 'red';
