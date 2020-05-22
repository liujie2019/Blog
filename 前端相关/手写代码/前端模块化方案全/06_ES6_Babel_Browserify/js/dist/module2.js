"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fun1 = fun1;
exports.fun2 = fun2;

// 统一暴露
function fun1() {
  console.log('fun1() module2');
}

function fun2() {
  console.log('fun2() module2');
}