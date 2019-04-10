const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    if (ctx.url === '/test') {
        // 设置cookie
        ctx.cookies.set('name', 'liujie');
        ctx.body = 'cookie is set ok';
    }
    else {
        ctx.body = 'hello koa';
    }
});

app.listen(8088, () => {
    console.log('[demo] server is starting at port 8088');
})