const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./router');

const app = express();

app.use(express.static(path.join(__dirname, './public/')));
app.use(express.static(path.join(__dirname, './node_modules/')));

app.engine('html', require('express-art-template'));
// 设置视图模板存储路径(默认就是./views/)
app.set('views', path.join(__dirname, './views/'));

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo

app.use(session({
    name: 'sessionId',
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'ljtest', // 自己设置
    resave: false,
    saveUninitialized: false // 无论你是否使用Session，我都默认直接给你分配一把钥匙
  }))

// 将路由挂载到app中
app.use(router);

// 配置一个处理 404 的中间件
// 需要放在后面，当前面所有的中间件都不匹配的时候才会执行
// 一旦前面有中间件匹配
app.use((req, res) => {
    res.render('404.html');
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        err_code: 500,
        message: err.message
    });
});

app.listen(3000, () => {
    console.log('server is running at 3000');
});