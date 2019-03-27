const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('首页get请求测试');
    res.send('hello get');
});

app.post('/', (req, res) => {
    console.log('首页post请求测试');
    res.send('hello post');
});

app.delete('/user', (req, res) => {
    console.log('user首页delete请求测试');
    res.send('user删除页面');
});

app.get('/user', (req, res) => {
    console.log(req.route.path); // 获取当前路由/user
    console.log(req.query); // { name: 'lisi' }
    console.log('user首页get请求测试');
    res.send('user列表页面');
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', (req, res) => {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
 })

const server = app.listen(8089, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('当前应用访问地址为: http://%s:%s', host, port);
});