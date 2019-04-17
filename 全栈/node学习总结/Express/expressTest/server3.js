/*
在路由中使用正则表达式
问号可以表示重复前面内容的0次或一次，也就是要么不出现，要么出现一次
这表示允许客户端不指定id参数值或name参数值
*/
const express = require('express');
const http = require('http');
const app = express();

app.get('/index.html/:id?/:name?', function(req, res) {
	let str = '';
	if(req.params.id) {
		str += 'ID参数值：' + req.params.id;
	}
	if(str !== '') {
		str += '<br>';
	}
	if(req.params.name) {
		str += 'name参数值：' + req.params.name;
	}	
	res.send(str);
});

app.listen(8080, '127.0.0.1');