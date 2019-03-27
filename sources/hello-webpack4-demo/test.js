const merge = require('webpack-merge');
const obj = { a: [1], b: 5, c: 20 };
const obj2 = { a: [2], b: 10, d: 421 };

console.log(merge(obj, obj2)); // { a: [ 1, 2 ], b: 10, c: 20, d: 421 }