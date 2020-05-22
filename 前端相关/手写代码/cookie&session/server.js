const express = require('express');
const cookieParser = require('cookie-parser'); // cookie解析中间件
const session = require('express-session');
const app = express();
// 引入路由中间件模块
const cookieRouter = require('./router/cookieRouter');
const sessionRouter = require('./router/sessionRouter');

app.use(express.static('public')); // 设置静态资源目录为public
app.use(cookieParser());
app.use(session({
    name: 'sessionId',  // 对应cookie的名称，默认为connect.sid
    // 将对应的cookie设置为持久化cookie ==> 关闭浏览器再打开还是以前的session
    cookie: {maxAge: 1000 * 60 * 60 * 24}, // cookie的有效期
    secret: 'session_test', // 内部加密的密钥(cookie中携带的sessionid编码后的密文)
    resave: true, // 每次请求都重新指定cookie的有效期
    saveUninitialized: true // 在向session中保存数据前就生成cookie
}));

// 注册路由器中间件
app.use('/cookie', cookieRouter); // 匹配以/cookie开头的路由
app.use('/session', sessionRouter); // 匹配以/session开头的路由

app.listen(3000, () => {
    console.log('server is running at port 3000');
});
