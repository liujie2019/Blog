const Koa = require('koa');
const convert = require('koa-convert');
const loggerGenerator  = require('./middleware/logger-generator');
const app = new Koa();

app.use(convert(loggerGenerator()));

app.use(ctx => {
    ctx.body = 'hello koa';
});

app.listen(8088, () => {
    console.log('server start at port 8088');
});