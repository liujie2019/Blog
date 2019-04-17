const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();
// app.use()加载中间件
app.use(koaBody());
app.use(async ctx => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});

// app.listen()方法用来启动服务并监听8088端口
app.listen(8088, () => {
    console.log('server start at port 8088');
});