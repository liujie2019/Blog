// 中间件使用
const express = require('express');

const app = express();

// 相当于根目录就是public
// http://localhost:3000/git_reset.png 这样可以访问到相应的图片
// app.use('/', express.static('public')); //访问静态文件的中间件

// http://localhost:3000/assets/assets/git_reset.png 需要这样访问
app.use('/assets', express.static('public'));

app.use((req, res, next) => {
    console.log('我是第一个中间件');
    next();
});
app.get('/', (req, res, next) => {
    res.send('中间件');
});

app.listen(3000, '127.0.0.1');
console.log('listening to port 3000');