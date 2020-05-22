const a = 123;
console.log(module.exports); // {}
console.log(exports); // {}
// 说明exports和module.exports是指向同一块内存空间
console.log(exports === module.exports); // true

exports.a = 200;
console.log(module.exports); // { a: 200 }
console.log(exports); // { a: 200 }

exports = '改变exports指向新的内存空间';
console.log(module.exports); // { a: 200 }
console.log(exports); // '改变exports指向新的内存空间'
