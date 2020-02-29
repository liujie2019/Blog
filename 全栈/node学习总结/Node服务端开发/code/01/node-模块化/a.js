// 在Node中，没有全局作用域，只有模块作用域(简单来讲就是文件作用域)
// 模块作用域：文件外部访问不到内部，内部也访问不到外部

var foo = 'aaa';
function add(a, b) {
    return a + b;
}
console.log('a start');
// require('./b.js'); // 加载并执行b.js
// require('b'); // 报错，表示引用核心模块
require('./b');  // 省略后缀名可以，默认是.js
console.log('a end');

// 虽然在a.js中加载并执行了b.js且b.js中也定义了变量foo，var foo = 'aaa';
// 但是a.js中的foo变量值并不会改变
console.log('foo的值是：', foo); // foo的值是： aaa