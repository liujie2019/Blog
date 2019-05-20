const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const render = require('koa-art-template');
const static = require('koa-static');
const session = require('koa-session');

const router = require('./router/router');

const app = new Koa();
//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'), // 视图位置
    extname: '.html' // 后缀名
});
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
};

app.use(session(CONFIG, app));
// 使用koa-bodyparser中间件
app.use(bodyParser());
app.use(router.routes());
app.use(static(path.join(__dirname, './node_modules')));
app.use(static(path.join(__dirname, './static')));

app.listen(8093, () => {
    console.log('app is listen 8093');
});
