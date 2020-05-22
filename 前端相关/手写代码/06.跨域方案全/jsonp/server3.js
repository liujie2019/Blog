const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.end('hello world');
});

app.get('/login', (req, res) => {
    // console.log(req.query); // { user: 'admin', callback: 'show' }
    const callback = req.query.callback;
    const data = {
        code: 0,
        msg: '我是服务端'
    };
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(`${callback}(${JSON.stringify(data)})`);
});

app.listen(8093, () => {
    console.log('server is running at 8093');
});