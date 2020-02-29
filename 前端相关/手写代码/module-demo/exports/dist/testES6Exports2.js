"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.a = void 0;
var a = '123';
exports.a = a;
var b = '456';
var _default = b;
exports["default"] = _default;
setTimeout(function () {
  exports.a = a = '123456';
}, 1000);
b = '456123';