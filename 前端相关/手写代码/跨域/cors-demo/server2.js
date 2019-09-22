const express = require('express');
const app = express();
const whiteList = ['http://localhost:3000'];
app.use(function (req, res, next) {
    let {origin} = req.headers;
    if (whiteList.includes(origin)) {
        // 设置哪些源可以访问
        res.setHeader('Access-Control-Allow-Origin', origin);
        // 设置接收哪些自定义请求头
        res.setHeader('Access-Control-Allow-Headers', 'name');
        // 允许哪些方法
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        // 设置预检请求的生效时间 6秒钟
        res.setHeader('Access-Control-Max-Age', 6);
        // 允许携带cookie
        res.setHeader('Access-Control-Allow-Credentials', true);
        // 设置安全的响应头，允许前端获取哪些响应头，多个的话用逗号分隔
        res.setHeader('Access-Control-Expose-Headers', 'name,age');
        // 防止响应内容乱码，设置响应内容编码为utf-8
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        if (req.method === 'OPTIONS') {
            console.log(1111);
            // res.end(); // OPTIONS请求不做任何处理
        }
    }
    next();
});

// app.put('/getName', (req, res) => {
//     // 跨域情况下后端服务可以拿到请求头进行判断处理
//     console.log(req.headers);
//     res.setHeader('name', 'lisi');
//     res.end('我是服务器');
// });

app.post('/getName', (req, res) => {
    // 跨域情况下后端服务可以拿到请求头进行判断处理
    // console.log(req.headers);
    res.end('我是服务器111');
});
app.put('/getName', (req, res) => {
    // 跨域情况下后端服务可以拿到请求头进行判断处理
    // console.log(req.headers);
    res.end('我是服务器222');
});

app.listen(4000, () => {
    console.log('server run at port 4000');
});