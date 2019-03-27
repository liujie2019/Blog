var foo = 'bbb';
// 执行node a.js，会报ReferenceError: add is not defined
// 也就说b.js中访问不到a.js中定义的函数
console.log(add(1, 2)); //
console.log('b start');
require('./c.js'); // 加载并执行c.js
console.log('b end');