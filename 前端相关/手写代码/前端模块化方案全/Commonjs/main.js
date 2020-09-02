const mod = require('./lib');

// console.log(mod);

console.log(mod.num);
// CommonJS输出的是值的拷贝，这里输出的对象obj的地址值
console.log(mod.obj); // { name: 'lisi' }
mod.increase();
console.log(mod.num);
console.log(mod.obj); // { name: 'wangwu' }