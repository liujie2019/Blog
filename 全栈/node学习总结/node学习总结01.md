NodeJs是编写高性能网络服务器的javascript工具包(用js开发服务端程序)
NodeJs是单线程、异步、事件驱动
特点：快，耗内存多

### NodeJs的模块化
Node.js采用模块方式管理和组织代码，Node.js所有的功能都存在每个模块中。

一个具有特定功能的文件就是一个模块，模块之间可能存在一定的依赖关系，使用模块可以很好的把这些依赖关系整合起来。
### 模块规范
#### AMD(Asyncchronous Module Definition=异步模块定义)
这种规范是异步的加载模块，requirejs采用了这一规范，适合客户端浏览器环境。

#### CMD(Common Module Definition)
seajs推崇的规范，国内大牛玉伯之作。
#### CommonJS
CommonJS诞生比较早，NodeJS就采用了CommonJS的规范来定义模块，但是CommonJS采用的是同步加载文件方式，只适用于服务端。

```
// main.js
require('./hello.js');

// 子模块, hello.js
// arguments是函数内置的变量
// arguments.callee指向arguments所在的函数
console.log(arguments.callee.toString());

// 输出的结果
/*
function (exports, require, module, __filename, __dirname) { // 子模块
// arguments是函数内置的变量
// arguments.callee指向arguments所在的函数
console.log(arguments.callee.toString());
}
*/
```
```
function (exports, require, module, __filename, __dirname) { // 子模块
	// 用户编写的代码
	exports：导出变量和函数
	require：引入模块
	module：模块对象
		module.exports：真正的导出对象
	__filename：文件名
	__dirname：文件路径
}
```
NodeJS是一个基于模块化的方式对代码进行组织和管理的，采用commonjs规范。将所有用户编写的代码放入一个函数中执行，所有变量和函数都是局部的。

```
const username = 'lisi';
module.exports.username = username; // 导出变量

const a = require('./hello.js'); // 引入模块
console.log(a.username);
```
### NodeJS模块分类
1. 自定义模块(用户自己编写的模块)
2. 第三方模块(第三方开发者贡献的模块)
3. 系统模块(NodeJS官方开发的模块)
### Buffer模块
为了让js能够处理二进制数据，node封装了一个Buffer模块，主要用于操作字节，处理二进制数据。
### fs模块
fs模块全称是`File System`，就是文件系统模块，用于对操作系统中的文件进行相关操作(文件的增删改查等)。
#### 读文件
在NodeJS中读取文件有两种方式：直接读取和流读取。
##### 直接读取(分为异步和同步两种)
```
const fs = require('fs');
// 异步读取
fs.readFile('./demo.txt', function(err, data) {
	if (err) {
		console.log(err);
	}
	console.log("异步读取:" + data.toString());
});
```
```
const fs = require('fs');
// 同步读取
fs.readFileSync('./demo.txt');
console.log("同步读取:" + data.toString());
console.log('文件读取完成');
```
#### 写文件
```
const fs = require('fs');
const data = '写文件测试内容';
// 异步读取
fs.writeFile('./test.txt', data, function(err) {
	if (err) {
		throw err;
	}
	else {
		console.log("文件写入成功");
	}
});
```
#### 删除文件
```
const fs = require('fs');

fs.unlink('./test.txt', function(err) {
	if (err) {
		throw err;
	}
	else {
		console.log("删除文件成功");
	}
});
```
### 流与管道
#### 什么是流？
应用程序中，流是一组有序的、有起点和终点的**字节数据**的传输方式。在应用程序中各种对象之间交换与传输数据的时候，总是先将该对象中所包含的数据转换为各种形式的流数据(即字节数据)，再通过流的传输，到达目的对象后再将流数据转换为该对象中可以使用的数据。
#### 读取文件流
```
const fs = require('fs');
let data = ''; // 存储每次读取的数据

const readerStream = fs.createReadStream('demo.txt'); //创建可读流
// 处理流事件: data,end,error
// error事件在文件读取失败时触发
// 监听data事件，有数据读取出来时就会触发
readerStream.on('data', function(chunk) {
	data += chunk;
});
// 监听end事件，当文件读取完成时触发
readerStream.on('end', function() {
	console.log(data);
});
console.log('程序执行完毕');
```
### 管道
管道(pipe)提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。这样就慢慢的实现了大文件的复制过程。

```
const fs = require('fs');
const readerStream = fs.createReadStream('input.txt'); //创建一个可读流
const writerStream = fs.createWriteStream('output.txt'); //创建一个可写流
// 管道读写操作
readerStream.pipe(writerStream);
```
### http模块
http模块是nodejs提供的基于http协议的通信模块，可以用于创建http服务器，也可以作为客户端向其他服务器发起请求。
### 网络爬虫思想
#### 抓取页面所有图片
1. 发起请求
2. 读取页面的html
3. 提取所有图片地址
4. 向图片地址发起请求
5. 获取图片数据
6. 将图片保存到硬盘

开发思路：

1. 使用http模块发起请求，获取到响应的数据
2. 分析html数据，提取所有的图片地址
3. 根据图片地址再次发起请求，获取图片文件保存到硬盘中

Node适合小型，实时事务型服务器网站；
GO更适合构建大型服务器网站；