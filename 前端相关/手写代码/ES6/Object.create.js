// Object.create方法的目的：基于传入的原型对象，创建一个实例对象
Object.create = function(prototype) {
    // 先创建一个空函数
    function Fn() {};
    // Fn的原型指向传入的原型对象
    Fn.prototype = prototype;
    // 返回Fn函数的实例
    // 希望返回的实例的__proto__指向传入的原型对象
    return new Fn();
}