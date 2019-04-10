function fibonacci(n, prev, next) {
    if (n <= 1) return next;
    return fibonacci(n-1, next, prev + next);
}

console.log(fibonacci(10, 1, 1));
console.log(fibonacci(100, 1, 1));
console.log(fibonacci(1000, 1, 1));