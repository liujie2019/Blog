[TOC]
### 最早这样写

```js
function foo() {
    //...
}
function bar() {
    //...
}
```
Global 被污染，很容易命名冲突。
### 简单封装：Namespace 模式
```js
var myAPP = {
    foo: function(){},
    bar: function(){}
}

myAPP.foo();
```

* 减少 Global 上的变量数目
* 本质是对象，一点都不安全

### 匿名闭包 ：IIFE 模式
```js
var Module = (function(){
    var _private = "safe now";
    var foo = function(){
        console.log(_private)
    }

    return {
        foo: foo
    }
})()

Module.foo();
Module._private; // undefined
```
函数是 JavaScript 唯一的 Local Scope。
#### 引入依赖
```js
var Module = (function($){
    var _$body = $("body");     // we can use jQuery now!
    var foo = function(){
        console.log(_$body);    // 特权方法
    }

    // Revelation Pattern
    return {
        foo: foo
    }
})(jQuery)

Module.foo();
```
这就是模块模式，也是现代模块实现的基石。
### 模块的定义与引用
```js
// math.js
exports.add = function(a, b){
    return a + b;
}
```
```js
// main.js
var math = require('math')      // ./math in node
console.log(math.add(1, 2));    // 3
```
#### 同步/阻塞式加载
```js
// timeout.js
var EXE_TIME = 2;

(function(second){
    var start = +new Date();
    while(start + second*1000 > new Date()){}
})(EXE_TIME)

console.log("2000ms executed")
```
```js
// main.js
require('./timeout');   // sync load
console.log('done!');
```
### 浏览器环境模块化方案(AMD/CMD)
#### AMD(Async Module Definition)
RequireJS 对模块定义的规范化产出。

```js
//AMD Wrapper
define(
    ["types/Employee"],  //依赖
    function(Employee){  //这个回调会在所有依赖都被加载后才执行
        function Programmer(){
            //do something
        };

        Programmer.prototype = new Employee();
        return Programmer;  //return Constructor
    }
)
```
#### CMD(Common Module Definition)
SeaJS 对模块定义的规范化产出。

```js
define(function(require, exports) {
    var a = require('./a'); //执行到此处时，a.js 才同步下载并执行
    a.doSomething();

    exports.foo = 'bar';
    exports.doSomething = function() {};
});
```
```js
// RequireJS 兼容风格
define('hello', ['jquery'], function(require, exports, module) {
    return {
        foo: 'bar',
        doSomething: function() {}
    };
});
```
#### CommonJS
```js
define(function (require) {
    var dependency1 = require('dependency1'),
        dependency2 = require('dependency2');

    return function () {};
});
```
```js
// parse out require...
define(
    ['require', 'dependency1', 'dependency2'],
function (require) {
    var dependency1 = require('dependency1'),
        dependency2 = require('dependency2');

    return function () {};
});
```
### AMD vs CommonJS
#### 书写风格
```js
// Module/1.0 CommonJS
var a = require("./a");  // 依赖就近
a.doSomething();

var b = require("./b")
b.doSomething();
```
```js
// AMD recommended style
define(["a", "b"], function(a, b){ // 依赖前置
    a.doSomething();
    b.doSomething();
})
```
#### 执行时机
```js
// Module/1.0
var a = require("./a");  // 执行到此时，a.js 同步下载并执行
```
```js
// AMD with CommonJS sugar
define(["require"], function(require){
    // 在这里， a.js 已经下载并且执行好了
    var a = require("./a")
})
```
### AMD vs CMD(真正的区别在于执行时机不同)
```js
// AMD recommended
define(['a', 'b'], function(a, b){
    a.doSomething();    // 依赖前置，提前执行
    b.doSomething();
})
```
```js
// CMD recommanded
define(function(require, exports, module){
    var a = require("a");
    a.doSomething();
    var b = require("b");
    b.doSomething();    // 依赖就近，延迟执行
})
```
### ES6模块化
```js
// math.js
export default math = {
    PI: 3.14,
    foo: function(){}
}
```
```js
// app.js
import math from "./math";
math.PI
```
```js
// export Declaration
export function foo(){
    console.log('I am not bar.');
}

// export VariableStatement;
export var PI = 3.14;
export var bar = foo;   // function expression

// export { ExportsList }
var PI = 3.14;
var foo = function(){};

export { PI, foo };
```
```js
// import { ImportsList } from "module-name"
import { PI } from "./math";
import { PI, foo } from "module-name";

// import IdentifierName as ImportedBinding
import { foo as bar } from "./math";
bar();  // use alias bar

// import NameSpaceImport
import * as math from "./math";
math.PI
math.foo()
```
### 参考博文
1. [javascript中的define用法](https://blog.csdn.net/qq_16633405/article/details/77961539)
2. [JavaScript 模块化七日谈](http://huangxuan.me/2015/07/09/js-module-7day/)
3. [前端模块化开发那点历史](https://github.com/seajs/seajs/issues/588)
4. [浅析JS模块规范：AMD和CMD](http://ghmagical.com/article/page/id/N7VY7Hg4TlgW)
5. [CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)
6. [AMD (中文版)](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
