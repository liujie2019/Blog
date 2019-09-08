[TOC]
#### 题目
>如何实现 multi(2)(3)(4)=24?

首先来分析下这道题，实现一个multi函数并依次传入参数执行，得到最终的结果。通过题目很容易得到的结论是，把传入的参数相乘就能够得到需要的结果，也就是 2 * 3 * 4 = 24。

```js
function multi(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        }
    }
}
```
>利用闭包的原则，multi函数执行的时候，返回multi函数中的内部函数，再次执行的时候其实执行的是这个内部函数，这个内部函数中接着又嵌套了一个内部函数，用于计算最终结果并返回。

单纯从题面来说，似乎是已经实现了想要的结果，但仔细一想就会发现存在问题。
上面的实现方案存在的缺陷：

* 代码不够优雅，实现步骤需要一层一层的嵌套函数。
* 可扩展性差，假如是要实现`multi(2)(3)(4)...(n)`这样的功能，那就得嵌套`n`层函数。

那么有没有更好的解决方案，答案是，使用函数式编程中的函数柯里化实现。

#### 函数柯里化
>函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。

函数柯里化的主要作用和特点就是：参数复用、提前返回和延迟执行。

```js
function curry(fn) {
    console.log(arguments); // { '0': [Function: add], '1': 5 }
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        console.log(arguments); // { '0': 3 }
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        // null在非严格模式下指向window
        return fn.apply(null, finalArgs);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

var curriedAdd = curry(add, 5);
console.log(curriedAdd(3)); // 8
```