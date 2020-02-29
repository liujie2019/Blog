const express = require('express');

// 创建服务器应用程序
// 相当于原生的http.createServer
const app = express();

app.use(express.static('public'));

// 当服务器收到get请求 / 的时候，执行回调处理函数
app.get('/', (req, res) => {
    res.send('hello express');
});
app.get('/about', (req, res) => {
    res.send('关于我');
});

app.listen(3000, () => {
    console.log('server is running at port 3000');
});