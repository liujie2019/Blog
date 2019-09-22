"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incCounter = incCounter;
exports.counter = void 0;
var counter = 3;
exports.counter = counter;

function incCounter() {
  exports.counter = counter = counter + 1;
}