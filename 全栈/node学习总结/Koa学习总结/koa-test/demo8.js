const Koa = require('koa');
const app = new Koa();

const logger = async (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

const main = async (ctx) => {
  ctx.response.body = 'Hello World';
};

app.use(logger);
app.use(main);
app.listen(3000);