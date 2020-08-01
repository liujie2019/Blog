// 测试用例2
// Koa源码中入口引用的也是lib/application.js
const Koa = require('./koa/application');
const app = new Koa();

app.use((ctx) => {
    // console.log(ctx.req.url); // /a
    // console.log(ctx.request.url); // /a
    // console.log(ctx.request.req.url); // /a
    // console.log(ctx.url); // /a  ctx会代理ctx.requets上的属性

    // console.log(ctx.req.query);

    // console.log(ctx.req.path); // undefined  ctx.req = req
    // console.log(ctx.request.path); // /a ctx.request是koa自己封装的属性
    // console.log(ctx.request.req.path); // undefined  ctx.request.req = req
    // console.log(ctx.path);// /a 用ctx来代理一下ctx.request属性
    ctx.body = 'hello koa 666';
});

app.listen(3000);