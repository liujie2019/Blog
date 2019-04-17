const express = require('express');
const http = require('http');
const app = express();

app.get('/index.html/:id/:name', function(req, res) {
	let str = '';
	for(let key in req.params) {
		if(str !== '') {
			str += '<br>';
		}
		str += '参数名：' + key;
		str += String.fromCharCode(9) + '参数值：' + req.params[key];
	}
	res.send(str);
});

app.listen(8080, '127.0.0.1');