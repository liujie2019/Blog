/*
next方法的使用
next方法调用下一个使用相同路由的get方法
*/
const express = require('express');
const http = require('http');
const app = express();

app.get('/index.html/:id(\\d+)', function(req, res, next) {
	if(req.params.id > 10) {
		next();
	}
	else {
		res.send('id参数值必须大于10.');
	}
});
app.get('/index.html/:id(\\d+)', function(req, res, next) {
	res.send('hi，你好！');
});
app.listen(8080, '127.0.0.1');