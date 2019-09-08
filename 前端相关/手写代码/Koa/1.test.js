// 测试用例
// Koa源码中入口引用的也是lib/application.js
const Koa = require('./koa/application');
const app = new Koa();

app.use((req, res) => {
    res.end('hello koa111');
});

app.listen(3000);