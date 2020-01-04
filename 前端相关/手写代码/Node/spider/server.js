// server.js文件

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const query = require('./src/db');
const app = express();

// 设置模板引擎
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);

// 首页路由
app.get('/', async (req, res) => {
    // 通过SQL查询语句拿到库里的movies表数据
    const movies = await query('SELECT * FROM douban_movie');
    // 渲染首页模板并把movies数据传过去
    res.render('index', { movies });
});
// 监听localhost:9000端口
app.listen(8088, () => {
    console.log('server running at port 8088');
});
