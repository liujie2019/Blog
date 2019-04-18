// 这里声明了两个路由，第一个是home，第二个是page，然后通过use赋予不同的前层级。

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

const home = new Router();
home.get('/liujie', async(ctx) => {
    ctx.body = 'Home liujie';
}).get('/todo',async(ctx) => {
    ctx.body = 'Home ToDo';
})

const page = new Router();
page.get('/liujie', async(ctx) => {
    ctx.body = 'Page liujie';
}).get('/todo', async(ctx) => {
    ctx.body = 'Page ToDo';
});

// 装载所有子路由
const router = new Router();
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000');
});
