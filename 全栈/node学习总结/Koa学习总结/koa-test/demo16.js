const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next(); // 没有错误则将执行权交给下一个中间件
  }
  catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx);
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.on('error', function(err) {
  console.log('logging error ', err.message);
  console.log(err);
});

app.use(handler);
app.use(main);
app.listen(3000);