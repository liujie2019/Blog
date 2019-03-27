const express = require('express');//引用express模块
const http = require('http');
const app = express();//创建express应用程序实例对象


//路径参数值为'/'表示对网站根目录的请求
//callback参数为一个回调函数，用于指定当接收到客户端请求时所需执行的处理
//req代表一个客户端请求
//res代表一个服务端响应对象
app.get('/index2.html', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<head><meta charset="utf-8"/></head>');
	res.end('你好啊,lisi\n');
});

app.listen(1337, '127.0.0.1');
