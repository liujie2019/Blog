// 实现Object.create
/**
 * 实现思路：
 * 1. 接收一个要作为原型的对象；
 * 2. 返回一个原型指向该对象的空对象
*/

Object.create = function(obj) {
    let o = {};
    // 理论上是可以的，但是__proto__在ie中不支持
    o.__proto__ = obj;
    return o;
}

Object.create = function(obj) {
    function Fn() {};
    Fn.prototype = obj;
    // new Fn()就是一个空对象，因为没有任何私有属性和方法
    return new Fn();
}