(function(modules) {
    var installedModules = {};
    // webpack自己实现了一个require方法
    function __webpack_require__(moduleId) {
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    // 默认去加载对应的入口文件./src/index.js
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({

 "./src/index.js":
 (function(module, exports, __webpack_require__) {
eval(`__webpack_require__("./src/style/index.less");

const a = __webpack_require__("./src/a.js");

console.log(a);`);
}),

 "./src/style/index.less":
 (function(module, exports, __webpack_require__) {
eval(`const style = document.createElement('style');
style.innerHTML = "body {\\n  background-color: aquamarine;\\n  font-size: 30px;\\n}\\n";
document.head.appendChild(style);`);
}),

 "./src/a.js":
 (function(module, exports, __webpack_require__) {
eval(`const b = __webpack_require__("./src/test/b.js");

module.exports = 'hello ' + b;`);
}),

 "./src/test/b.js":
 (function(module, exports, __webpack_require__) {
eval(`module.exports = 'webpack 6666';`);
}),

});