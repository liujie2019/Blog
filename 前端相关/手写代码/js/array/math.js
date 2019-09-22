const arr = [1, 5, 7, 9];

function smallest(arr) {
    return Math.min.apply(Math, arr);
}

function largest(arr) {
    return Math.max.apply(Math, arr);
}

console.log(smallest(arr)); // 1
console.log(largest(arr)); // 9
console.log(Math.min(...arr)); // 1
console.log(Math.max(...arr)); // 9
console.log(Reflect.apply(Math.min, Math, arr)); // 1
console.log(Reflect.apply(Math.max, Math, arr)); // 9