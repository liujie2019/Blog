const Koa = require('koa');
const loggerAsync  = require('./middleware/logger-async');
const app = new Koa();

app.use(loggerAsync());

app.use(ctx => {
    ctx.body = 'hello koa';
});

app.listen(8088, () => {
    console.log('server start at port 8088');
});