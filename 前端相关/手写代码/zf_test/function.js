/**
 * 箭头函数与普通函数的区别是什么？构造函数可以使用new生成实例，那么箭头函数可以吗？为什么？
 * 1. 箭头函数语法上比普通函数更加简洁(ES6中任何函数都可以给形参赋默认值和使用剩余运算符)
 * 2. 箭头函数没有自己的this，它里面的this是继承函数所属上下文中的this(使用call或者apply都无法改变其this指向)。
*/

const obj = {name: 'lisi'};

function fn() {
    console.log(this); // {name: "lisi"}
}
fn.call(obj);

const fn2 = () => {
    console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
}
fn2.call(obj);