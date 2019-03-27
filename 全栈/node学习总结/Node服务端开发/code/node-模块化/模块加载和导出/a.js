// require方法的两个作用
// 1. 加载模块并执行模块里的代码
// 2. 拿到被加载文件模块导出的接口对象

// 每个文件模中都提供了一个对象：exports
// exports 默认是一个空对象，即b.js中没有导出任何信息
// 我们需要做的就是把所有需要被外部访问的成员挂载到exports对象上
const b = require('./b');

console.log(b); //{ test: 'test' }
console.log(b.test); // test
console.log(b.add(1, 2)); // 3



// 遗留问题：exports和module.exports区别？