function myNew(fn, ...args) {
    if (typeof fn !== 'function') {
        throw new Error();
    }
    const obj = Object.create(fn.prototype);
    const res = fn.apply(obj, args);
    const isObject = typeof res === 'object' && typeof res !== 'null';
    const isFunction = typeof res === 'function';
    if (isFunction || isObject) {
        return res;
    }
    return obj;
}

// Object.create = function(proto) {
//     function Fn() {};
//     Fn.prototype = proto;
//     return new Fn();
// }