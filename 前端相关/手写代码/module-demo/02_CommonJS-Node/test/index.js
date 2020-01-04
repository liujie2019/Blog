const test = require('./test.js');

console.log(test); // { a: 12, add: [Function: add] }
console.log(test.a); // 12
console.log(test.add(2)); // 14