function curry_fn(fn, curArgs) {
    return function() {
        let args = Array.prototype.slice.call(arguments); // 将类数组变为数组
        if (curArgs !== undefined) {
            args = args.concat(curArgs);
        }
        // console.log(fn.length); // 3 fn函数形参的个数
        if (args.length < fn.length) {
            // 递归
            return curry_fn(fn, args);
        }
        // 递归出口
        return fn.apply(null, args);
    };
}

function sum(a, b, c) {
    return a + b + c;
}

const fn = curry_fn(sum);

console.log(fn(1, 2, 3)); // 6
console.log(fn(1)(2)(3)); // 6
console.log(fn(1, 2)(3)); // 6
console.log(fn(1)(2, 3)); // 6