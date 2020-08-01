function curry_fn(fn) {
    const outerArgs = [...arguments].slice(1);
    return function () {
        const innerArgs = [...arguments];
        let allArgs = [];
        if (outerArgs.length) {
            allArgs = [...outerArgs, ...innerArgs];
        }
        else {
            allArgs = [...innerArgs];
        }
        // fn.length是sum函数的形参个数
        if (allArgs.length < fn.length) {
            // 递归
            return curry_fn(fn, ...allArgs);
        }
        // 递归出口
        return fn.apply(null, allArgs);
    }
}

function sum(a, b, c) {
    return a + b + c;
}

const fn = curry_fn(sum);

console.log(fn(1, 2, 4)); // 7
console.log(fn(1)(2)(4)); // 7
console.log(fn(1, 2)(4)); // 7
console.log(fn(1)(2, 4)); // 7