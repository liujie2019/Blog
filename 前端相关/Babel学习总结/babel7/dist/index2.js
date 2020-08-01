"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _context;

// import '@babel/polyfill';
// import "core-js/stable";
// import "regenerator-runtime/runtime";
var isInclude = (0, _includes["default"])(_context = [1, 2, 32]).call(_context, 2);
console.log(isInclude);
var p = new _promise["default"](function () {});