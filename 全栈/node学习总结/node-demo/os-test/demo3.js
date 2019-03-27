function add (a, b) {
    const c = a + b;
    return c;
}
function divide (c, d) {
    e = c / d;
    return e;
}
function fibonacci(num) {
    if (num <= 1) {
        return 1;
    }
    let result = add(fibonacci(num - 1), fibonacci(num - 2));
    result = divide(result, 1);
    return result;
}

const fib = fibonacci(5);