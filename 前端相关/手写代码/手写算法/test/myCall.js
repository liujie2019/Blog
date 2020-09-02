// call
Function.prototype.call = function(context, ...args) {
    const ctx = context ? context : window;
    // const args = [...arguments].slice(1); // 获取参数
    ctx.fn = this;
    let res = ctx.fn(...args);
    delete ctx.fn;
    return res;
}

// apply
Function.prototype.apply = function(context, args) {
    const ctx = context ? context : window;
    // const args = Array.from(arguments).slice(1);
    ctx.fn = this;
    let res;
    if (args && args.length) {
        res = ctx.fn(...args);
    } else {
        res = ctx.fn();
    }
    delete ctx.fn;
    return res;
}

// bind
Function.prototype.bind = function(context, ...outerArgs) {
    let self = this; // 保存当前函数
    function Fn() {}
    function fBound() {
        const innerArgs = Array.from(arguments);
        const args = [...outerArgs, ...innerArgs];
        return self.call(this instanceof fBound ? this : context, ...args);
    }
    Fn.prototype = self.prototype; // 针对构造函数的情况
    fBound.prototype = new Fn();
    return fBound;
}

var name = 'wangwu';
const obj = {
    name: 'lisi'
};

function sayName(a, b, c) {
    console.log(a+b+c);
    console.log(this.name);
}

sayName.call(obj, 4, 5, 6);
sayName.apply(obj, [1, 2, 3]);

const myName = sayName.bind(obj, 2, 3, 4);
myName();