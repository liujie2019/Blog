function myNew(fn, ...args) {
    if (typeof fn !== 'function') {
        throw new Error('fn not a function');
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

// 实现Object.create
Object.create = function(proto) {
    function Fn() {};
    Fn.prototype = proto;
    return new Fn();
}

// function myNew(fn, ...args) {
//     if (typeof fn !== 'function') {
//         throw new TypeError('new can only be called by function');
//     }
//     let obj = Object.create(fn.prototype);
//     let res = fn.call(obj, ...args);
//     let isObject = typeof res === 'object' && res !== null;
//     let isFunction = typeof res === 'function';
//     if (isFunction || isObject) {
//         return res;
//     }
//     return obj;
// }

function myInstanceof (left, right) {
    let proto = right.prototype;
    let prototype = Object.getPrototypeOf(left);
    while(true) {
        if (proto === prototype) {
            return true;
        }
        if (prototype === null) {
            return false;
        }
        prototype = Object.getPrototypeOf(prototype);
    }
}