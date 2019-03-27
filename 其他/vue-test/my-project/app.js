//引入express模块
const express = require('express');

const mongoose = require("mongoose");
const bodyParser = require("body-parser")

//创建app对象
const app = express();

//引入路由
const hero = require('./router/hero');

//这一句是连接上数据库
var db = mongoose.connect('mongodb://localhost:27017/myheros');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', hero);

//定义服务启动端口
app.listen(8088, () => {
    console.log('app listening on port 8088');
})