/******/ (function(modules) { // webpackBootstrap
            // modules即存放所有模块的数组，数组中的每个元素都是一个函数
/******/ 	// The module cache
            // 安装过的模块都存放在这里面
            // 作用是将已经加载过的模块缓存在内存中，提升性能
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
            // 去数组中加载一个模块，moduleId是要加载模块在数组中的index
            // 作用和Node.js中的require语句相似
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
                // 如果需要加载的模块已经被加载过，就直接从缓存中返回
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
                // 如果缓存中不存在需要加载的模块，就新建一个模块，并将它存在缓存中
/******/ 		var module = installedModules[moduleId] = {
                    // 模块在数组中的index
/******/ 			i: moduleId,
                    // 该模块是否已经加载完毕
/******/ 			l: false,
                    // 该模块的导出值
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
                // 从modules中获取index为moduleId的模块对应的函数
                // 再调用这个函数，同时将函数需要的参数传入
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
                // 将这个模块标记为已加载
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
                // 返回这个模块的导出值
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({
// modules其实就是一个对象，键是模块的路径，值就是模块的JS Function
/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("{test123567};console.log('hello webpack');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });