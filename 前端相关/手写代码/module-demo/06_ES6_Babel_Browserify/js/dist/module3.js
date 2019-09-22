"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 默认暴露 可以暴露任意数据类项，暴露什么数据，接收到就是什么数据
// 默认暴露在每个模块中只能使用一次，多次使用会报错
var _default = function _default() {
  console.log('默认暴露');
};

exports["default"] = _default;