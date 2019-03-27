### Webpack 中执行代码分割
#### 允许代码分割(CommonsChunkPlugin)
对于多个打包入口的情况：
相应的配置文件：webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
//单入口文件时候不能把引用多次的模块打印到commonChunkPlugin中
module.exports = {
	entry: {
		main: "./src/main.js",
		main1: "./src/main1.js"
	},
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "[name].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,"index.html"),
			filename: "index-[hash].html",//相应的文件名称
			inject: "body"//插入到body标签中，默认值
		}),
		new webpack.optimize.CommonsChunkPlugin({
			//公共模块文件名称
			name: "common",
			filename: "[name].js",
			//指定最小引用次数(2次)
			//引用小于两次的均不会被提取到common.js中
			minChunks: 2
		})
	]
};
```
main.js:

```
import chunk1 from './chunk1.js';
console.log("main");

```
main1.js:

```
import chunk1 from './chunk1.js';
console.log("main1");
```
chunk1.js：

```
let chunk1 = 1;
export default chunk1;
```
引入`CommonsChunkPlugin`插件，打包后生成三个文件：一个是`main.js`, 一个`main1.js`，一个`common.js`。这里要注意，`common.js`需要最先加载，因为其中包含`webpack`生成的在浏览器上使用各个块的加载代码，所以页面上使用的时候`common.js`必须最先加载。

common.js:

```
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	var resolvedPromise = new Promise(function(resolve) { resolve(); });
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		if(installedChunks[chunkId] === 0) {
/******/ 			return resolvedPromise;
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunks[chunkId]) {
/******/ 			return installedChunks[chunkId][2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunks[chunkId][2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

let chunk1 = 1;
exports.chunk1 = chunk1;
/***/ })
/******/ ]);
```
这是一个立即执行的匿名函数，参数就是打包后的chunk1模块，该模块ID被分配为0。这个匿名函数将chunk1模块保存在变量modules数组中，定义了一个全局函数`webpackJsonp` 和局部函数`__webpack_require__`。

webpackJsonp函数的三个参数：
第一个参数代表`chunkid`，每一个chunkid都对应一个 js 文件，即入口文件；
第二个参数`moreModules`，就是该入口js文件中所依赖的资源模块和导出本身的module；
第三个参数`executeModules`,就是执行环境所在的模块。

打包后的main.js:

```
webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chunk1_js__ = __webpack_require__(0);

console.log("main");
/***/ })
],[1]);
```
这个模块就是调用common.js中定义的`webpackJsonp`函数，传了三个参数。
#### webpack中的id
webpack的id有两种：chunkid和moduleId。

 - chunkid
每个chunkid对应的是一个入口js文件，这个chunkid的作用就是：用来标记这个js文件是否已经加载过了。而installedChunks 是记录一个chunkid是否已经加载过了。
 - moduleid
每个moduleid对应的是相应的入口js文件中所依赖的资源模块，并为每个资源模块分配一个moduleid。

#### 参数minChunks: Infinity

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
//单入口文件时候不能把引用多次的模块打印到commonChunkPlugin中
module.exports = {
	entry: {
		main: "./test1/main.js",
		main1: "./test1/main1.js",
		common: ['jquery']
	},
	output: {
		path: path.resolve(__dirname,"dist/test1"),
		filename: "[name].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,"index.html"),
			filename: "index-[hash].html",//相应的文件名称
			inject: "body"//插入到body标签中，默认值
		}),
		new webpack.optimize.CommonsChunkPlugin({
			//公共模块文件名称
			name: ["common"],
			filename: "[name].js",
			minChunks: 2
		})
	]
};
```
main.js和main1.js共同引用的chunk1和chunk2会被打包到common.js中。
但是要注意：`minChunks:2`修改为`minChunks:Infinity`后，chunk1和chunk2都打包到main.js和main1.js里
#### 参数chunks
webpack.config.js：

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
//单入口文件时候不能把引用多次的模块打印到commonChunkPlugin中
module.exports = {
	entry: {
		main: "./test1/main.js",
		main1: "./test1/main1.js",
		common: ['jquery']
	},
	output: {
		path: path.resolve(__dirname,"dist/test1"),
		filename: "[name].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,"index.html"),
			filename: "index-[hash].html",//相应的文件名称
			inject: "body"//插入到body标签中，默认值
		}),
		new webpack.optimize.CommonsChunkPlugin({
			//公共模块文件名称
			name:["common"],
			filename: "[name].js",
			minChunks: 2，
			chunks:["main","main1"]
			//只有在main.js和main1.js中都引用的模块才会被打包的到公共模块（这里即common.js）
		})
	]
};
```