// express是一个函数
const express = require('./express');
// app监听函数
const app = express();
// req代表的是请求
// res代表的是响应
// RESTFUL API 根据方法名的不同，做对应的资源处理
app.get('/name', (req, res) => {
    res.end('liujie26');
});
// 测试：curl -X POST http://localhost:3000/name
app.post('/name', (req, res) => {
    res.end('liujie26 post');
});
app.all('*', (req, res) => {
    res.end(`${req.method}test`);
});
// app.get('/data', (req, res) => {
//     res.json({
//         name: 'lisi',
//         age: 12
//     });
// });
app.listen(3000, () => {
    console.log('server at port 3000');
});
