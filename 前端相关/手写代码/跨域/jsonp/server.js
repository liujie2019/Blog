const express = require('express');
const app = express();

app.get('/home', (req, res) => {
    const {wd, cb} = req.query;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8'); // 指定字符编码
    res.end(`${cb}('我是后端服务器')`);
});
app.listen(3000, () => {
    console.log('server run at port 3000');
});