Function.prototype.before = function(cb) {
    const that = this; // 保存原函数的引用
    return function(...args) {
        if (cb.call(this, ...args) === false) {
            return false;
        }
        return that.call(this, ...args);
    }
}

Function.prototype.after = function(cb) {
    return function(...args) {
        cb.call(this, ...args);
    }
}

const fn = () => {
    console.log('fn');
}

const fnAop = fn.before(() => {
    console.log('before fn');
}).after(() => {
    console.log('after fn');
});

fnAop();