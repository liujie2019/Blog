// 中间件 use
// 中间件 在执行路由之前，要做一些处理工作，就可以采用中间件
// 中间件可以扩展一些方法
const express = require('./express');

const app = express();
// use 方法第一个参数如果省略不写，默认就是/
// 该路由能匹配所有以/开头的路由
app.use('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    console.log('middleware1');
    // next('出错了hahha');
    next();
});
// 下面的中间件只能匹配以/home开头的路由
app.use('/home', (req, res, next) => {
    console.log('middleware2');
    next();
});
app.get('/home', (req, res) => {
    console.log(req.path); // /home
    console.log(req.hostname); // localhost
    console.log(req.query); // { name: '112' }
    res.end('我是首页');
});
app.get('/user', (req, res) => {
    res.end('我是用户页');
});
// 错误中间件放到路由的最下面
app.use(function(err, req, res, next) {
    console.log(err);
    // 调用next可以继续向下传递错误
    next(err);
});
app.use(function(err, req, res, next) {
    console.log(err);
});
app.listen(3000, () => {
    console.log('server at port 3000');
});