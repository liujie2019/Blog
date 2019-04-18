const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');

const redirect = async (ctx) => {
    console.log('重定向了');
    ctx.response.redirect('/');
};

const home = async (ctx) => {
    ctx.response.body = '<a href="/">我是首页</a>'
};

app.use(route.get('/', home));
app.use(route.get('/redirect', redirect));

app.use(home);
app.listen(3000);