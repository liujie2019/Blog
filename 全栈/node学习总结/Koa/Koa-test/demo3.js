const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
    await next();
    console.log(11);
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    console.log(22);
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
    console.log(33);
    ctx.body = 'Hello World';
});

app.listen(8088, () => {
    console.log('server start at port 8088');
});