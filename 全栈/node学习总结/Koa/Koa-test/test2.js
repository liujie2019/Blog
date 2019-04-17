function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
       var innerArgs = Array.prototype.slice.call(arguments);
       var finalArgs = innerArgs.concat(args);
       return fn.apply(null, finalArgs);
    }
}

function tailFibonacci(n, prev, next) {
    if (n <= 1) return next;
    return tailFibonacci(n - 1, next, prev + next);
}
const fibonacci = curry(tailFibonacci, 1, 1);
console.log(fibonacci(10, 1, 1));
console.log(fibonacci(100, 1, 1));
console.log(fibonacci(1000, 1, 1));

/*
arr.slice(); // 相当于复制原数组
[0, end]

arr.slice(begin);
[begin, end]

arr.slice(begin, end); // 包含头不包含尾
[begin, end)
*/