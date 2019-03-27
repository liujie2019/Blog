/*
同步方法和异步方法，两者区别在于：同步方法立即返回操作结果，在使用同步方法执行的操作结束之前，不能执行后续代码。
在NodeJs中使用fs模块来实现所有有关文件及目录的创建、写入及删除操作。
*/
const fs = require('fs');
//同步调用
const data = fs.readFileSync('./index.html', 'utf8');
console.log(data);
//异步调用
//异步方法将操作结果作为回调函数的参数进行返回
fs.readFile('./index.html', 'utf8', function(err, data) {
	console.log(data);
}