// const {count} = require('./counter');

// console.log(count);

let p1 = require('./person');
p1.name = 'wangwu';

let p2 = require('./person');
console.log(p2.name); // wangwu
console.log(p1 === p2); // true