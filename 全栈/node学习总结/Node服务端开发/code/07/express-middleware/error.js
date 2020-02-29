const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res, next) => {
    fs.readFile('./a.js', (err, data) => {
        if (err) {
            next(err);
        }
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(3000, () => {
    console.log('server is running');
});