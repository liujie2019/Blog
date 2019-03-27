const express = require('express');
const app = express();
const path = require('path');
// var bodyParser = require('body-parser');    //引入body-parser模块，来解析post请求

//配置引擎模板以及静态文件访问文件夹
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './'));
// app.engine('html', require('ejs').__express);
// app.use(express.static(path.join(__dirname, 'static')));

//首页
app.get(['/', '/index', '/index.html'], (req, res, next) => {
    // res.send('hello world');
    res.sendfile('index.html');
});

var hostname = '127.0.0.1';
var port = 3000;
app.listen(port, hostname, (err) => {
    if(err) throw err;
    console.log('server running at http://'+ hostname + ':' + port);
});