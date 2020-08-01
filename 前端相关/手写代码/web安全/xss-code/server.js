const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const static = require('koa-static');

const app = new Koa();

router.get('/', (ctx, next) => {
  // 设置头类型, 如果不设置，会直接下载该页面
  ctx.type = 'html';
  // 读取文件
  const pathUrl = path.join(__dirname, '/static/index.html');
  ctx.body = fs.createReadStream(pathUrl);
//   next();
});

router.get('/xss', (ctx, next) => {index.js
  ctx.body = '<script>alert("反射型 XSS 攻击")</script>';
});
router.get('/testcookie', (ctx, next) => {
//   console.log(ctx.cookies.get('connect.sid'));
  console.log(ctx.cookies.get('name'));
  ctx.body = '<script>alert("'+ctx.cookies.get('name')+'")</script>';
//   next();
});

app.use(static(path.join(__dirname)));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8097, () => {
  console.log('server is listen in 8097');
});