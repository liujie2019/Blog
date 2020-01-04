function curry(fn) {
    const ourArgs = [...arguments].slice(1); // 获取外部参数
    return function() {
        const innerArgs = [...arguments];
        let allArgs = [];
        if (ourArgs.length > 0) {
            allArgs = [...ourArgs, ...innerArgs];
        } else {
            allArgs = [...innerArgs];
        }
        if (allArgs.length < fn.length) {
            return curry(fn, ...allArgs);
        }
        return fn.call(null, ...allArgs);
    }
}

function sum(a, b, c) {
    return a + b + c;
}

// const fn = curry(sum, 1);
// console.log(fn(2, 4));
// console.log(fn(2)(4));
const fn = curry(sum);
console.log(fn(1, 2, 4)); // 7
console.log(fn(1)(2)(4)); // 7
console.log(fn(1, 2)(4)); // 7
console.log(fn(1)(2, 4)); // 7