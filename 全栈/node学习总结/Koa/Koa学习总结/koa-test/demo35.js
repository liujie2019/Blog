const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
    ctx.body = ctx.query;
});
app
  .use(router.routes())
  .use(router.allowedMethods());
  app.listen(3000,() => {
      console.log('starting at port 3000');
  });