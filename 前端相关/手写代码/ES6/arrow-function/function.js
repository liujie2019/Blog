function add(a, b) {
    a = a || 5;
    b = b || 6;
    return a + b;
}

console.log(add()); // 11
console.log(add(1, 2)); // 3

function add(a = 5, b = 6) {
    return a + b;
}

console.log(add()); // 11
console.log(add(1, 2)); // 3

function add(a = 5, b = 6) {
    return a + b;
}

console.log(add(1)); // 7

function add(a = 5, b = 6) {
    return a + b;
}

console.log(add(undefined, 3)); // 8