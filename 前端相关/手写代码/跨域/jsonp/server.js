const express = require('express');
const app = express();

app.get('/login', (req, res) => {
    // const {wd, cb} = req.query;
    console.log(req.query); // { user: 'admin', callback: 'show' }
    const {callback} = req.query;
    const data = {
        code: 0,
        msg: '我是后端服务器'
    };
    res.setHeader('Content-Type', 'text/plain;charset=utf-8'); // 指定字符编码
    res.end(`${callback}(${JSON.stringify(data)})`);
});
app.listen(3000, () => {
    console.log('server run at port 3000');
});