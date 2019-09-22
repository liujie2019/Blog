(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],2:[function(require,module,exports){
/**
 * 暴露模块
 * module.exports = value
 * exports.xxx = value
 * 引入模块
 * var mnodule = require(模块名称或模块路径)
*/

const uniq = require('uniq');
const module1 = require('./module1');
const module2 = require('./module2');
const module3 = require('./module3');

module1.foo();
module2();
module3.bar();
module3.foo();
console.log(uniq([1, 2, 2, 1, 1, 3, 11]));

},{"./module1":3,"./module2":4,"./module3":5,"uniq":1}],3:[function(require,module,exports){
/**
 * 使用module.exports = value向外暴露一个对象
*/
module.exports = {
    foo() {
        console.log('module1 foo()');
    }
}
},{}],4:[function(require,module,exports){
/**
 * 使用module.exports = value向外暴露一个函数
*/
module.exports = function () {
    console.log('module2');
}
},{}],5:[function(require,module,exports){
/**
 * 使用exports.xxx = value向外暴露一个对象
*/
exports.foo = function() {
    console.log('module3 foo()');
}

exports.bar = function() {
    console.log('module3 bar()');
}
},{}]},{},[2]);
