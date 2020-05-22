(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _module = require("./module1");

var fn = _interopRequireWildcard(require("./module2"));

var _module3 = _interopRequireDefault(require("./module3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

console.log(fn);
fn.fun1();
console.log('---------');
(0, _module.foo)();
(0, _module.bar)();
(0, fn.fun1)();
(0, fn.fun2)();
(0, _module3["default"])();
},{"./module1":2,"./module2":3,"./module3":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;
exports.bar = bar;

// 分别暴露
function foo() {
  console.log('foo() module1');
}

function bar() {
  console.log('bar() module1');
}
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}]},{},[1]);
