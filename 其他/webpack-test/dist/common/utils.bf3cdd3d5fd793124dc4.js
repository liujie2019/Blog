(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common/utils"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("{test123567};// const show = require('./show.js');\n// show('Webpack');\nconst { SyncHook } = __webpack_require__(/*! tapable */ \"./node_modules/tapable/lib/index.js\");\nlet queue = new SyncHook(['name']); //所有的构造函数都接收一个可选的参数，这个参数是一个字符串的数组。\n\n// 订阅\nqueue.tap('1', function (name, name2) {// tap 的第一个参数是用来标识订阅的函数的\n    console.log(name, name2, 1);\n    return '1'\n});\nqueue.tap('2', function (name) {\n    console.log(name, 2);\n});\nqueue.tap('3', function (name) {\n    console.log(name, 3);\n});\n\n// 发布\nqueue.call('webpack', 'webpack-cli');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

}]);