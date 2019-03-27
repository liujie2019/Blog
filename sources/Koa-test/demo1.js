/**
 * 入门例子
 */
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'hello koa2';
});

app.listen(8088, () => {
    console.log('server start at port 8088');
});