// cookie管理
// 使用cookie-parser中间件向 Node.js 服务器发送 cookie 信息
const express = require('express');
const cookieParser = require('cookie-parser');
const util = require('util');

const app = express();
app.use(cookieParser());

// util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。
// 它至少接受一个参数 object，即要转换的对象
app.get('/', (req, res) => {
    console.log("Cookies: " + util.inspect(req.cookies));
})

const server = app.listen(8089, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('当前应用访问地址为: http://%s:%s', host, port);
});