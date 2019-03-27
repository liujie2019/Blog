const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const router = new Router({
    prefix:'/project'
})

router.get('/', (ctx) => {
    ctx.body = 'Hello Koa';
})
.get('/todo', (ctx) => {
    ctx.body = 'Todo page';
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000,() => {
    console.log('starting at port 3000');
});