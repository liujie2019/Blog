/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
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
/******/ 	__webpack_require__.p = "/Users/liujie26/study/Blog/前端相关/Webpack学习总结/webpack4-study/demo5-1/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_images_svg1_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// import './style/index.css';


document.querySelector('.box').innerHTML = _assets_images_svg1_svg__WEBPACK_IMPORTED_MODULE_0__["default"];
console.log('hello svg666');

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1560603494616\" class=\"icon\" style=\"\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"903\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M334.8 768.5h-87.3c-22.1 0-40-17.9-40-40V358.1c0-22.1 17.9-40 40-40h87.3c22.1 0 40 17.9 40 40v370.4c0 22-18 40-40 40z m-67.3-60h47.3V378.1h-47.3v330.4z m498.2 60h-87.3c-22.1 0-40-17.9-40-40V358.1c0-22.1 17.9-40 40-40h87.3c22.1 0 40 17.9 40 40v370.4c0 22-17.9 40-40 40z m-67.2-60h47.3V378.1h-47.3v330.4z m-148.2 56H463c-22.1 0-40-17.9-40-40V184.1c0-22.1 17.9-40 40-40h87.3c22.1 0 40 17.9 40 40v540.4c0 22-18 40-40 40z m-67.3-60h47.3V204.1H483v500.4z m330.7 162.3h-606c-16.6 0-30-13.4-30-30s13.4-30 30-30h606.1c16.6 0 30 13.4 30 30s-13.5 30-30.1 30z\" p-id=\"904\"></path></svg>");

/***/ })
/******/ ]);