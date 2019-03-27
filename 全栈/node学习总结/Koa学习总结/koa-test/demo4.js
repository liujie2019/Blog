const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const home = async (ctx) => {
    ctx.response.body = 'Hello Koa';
}

const about = async (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">跳转到首页</a>';
}

app.use(route.get('/', home));
app.use(route.get('/about', about));
app.listen(3000);