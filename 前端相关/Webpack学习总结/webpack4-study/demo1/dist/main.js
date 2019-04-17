 (function(modules) { // webpackBootstrap webpack启动函数
   	// The module cache 先定义一个缓存
 	var installedModules = {};

 	// The require function 实现了require方法
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}
 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
 ({
 "./src/index.js":
    (function(module, exports) {
        eval("console.log(1, '------');\n\n//# sourceURL=webpack:///./src/index.js?");
    })
});