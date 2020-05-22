"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sayName = sayName;
exports.sayAge = sayAge;
exports["default"] = exports.a = void 0;
// 导出变量
var a = 123; // 导出方法-方式1

exports.a = a;

function sayName() {
  console.log('lisi');
} // 导出方法-方式2


function sayAge() {
  console.log(12);
}

// export default导出
var b = 321; // export default const b = 321; 不支持这样书写

var _default = b;
exports["default"] = _default;