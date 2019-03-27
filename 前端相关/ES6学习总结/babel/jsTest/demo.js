// 声明Symbol
// 我们先来回顾一下我们的数据类型，在最后在看看Symbol如何声明，并进行一个数据类型的判断。

const a = new String;
const b = new Number;
const c = new Boolean;
const d = new Array;
const e = new Object;
const f = Symbol();
console.log(typeof(f)); // symbol