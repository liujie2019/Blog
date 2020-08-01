function myNew(fn, ...args) {
    if (typeof fn !== 'function') {
        throw new TypeError('fn must be a function');
    }
    myNew.target = fn;
    // 原型链绑定
    const obj = Object.create(fn.prototype);
    // 获取函数执行结果，fn中this指向obj
    const res = fn.apply(obj, args);
    if (res !== null && (typeof res === 'object' || typeof res === 'function')) {
        return res;
    }
    return obj;
}