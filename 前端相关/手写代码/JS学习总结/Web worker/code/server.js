const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const static = require('koa-static');
const app = new Koa();

const staticPath = './';

let router = new Router();


app.use(static(path.join(__dirname, staticPath)));
app.use( async ( ctx ) => {
    ctx.body = 'hello world'
});
// app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('server is running at port 3000');
});