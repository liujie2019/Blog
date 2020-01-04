console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite(1)); // true

console.log(Number.isNaN(NaN)); // true

console.log(Number.isInteger(1.12)); // false
console.log(Number.isInteger(1.0)); // true
console.log(Number.isInteger(1)); // true

console.log(Number.parseInt('123abc')); // 123
console.log(Number.parseInt('a123abc')); // NaN

console.log(Math.trunc(3.1415926)); // 3