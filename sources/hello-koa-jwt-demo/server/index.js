const Koa = require('koa');
const jwt = require('jsonwebtoken'); // 用于签发、解析token
const json = require('koa-json');
const koajwt = require('koa-jwt'); // 用于路由权限控制
const bodyparser = require('koa-bodyparser'); // 处理post请求参数
const cors = require('koa2-cors');

const sendHandle = require('./middleware/sendHandle');
const router = require('./routes/user');
const db = require('./db');

const app = new Koa();

// 设置跨域访问
app.use(cors({
    origin: (ctx) => {
      if (ctx.url === '/test') {
        return false;
      }
      // 允许来自所有域名请求
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    // maxAge设置本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    maxAge: 5,
    // credentials表示是否允许发送Cookie
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(json());
app.use(bodyparser());
app.use(sendHandle());
app.use(koajwt({
    secret: 'i_love_jwt'
}).unless({ // 注册和登录页面不需要权限验证
    path: [/\/api/, /\/api\/signup/, /\/api\/login/]
}));
app.use(router.routes());

app.listen(8088, () => {
    console.log('Starting at port 8088');
});