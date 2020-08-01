const Koa = require('koa');
const app = new Koa();

// 获取请求的路径 req.url
// req.path
app.use((ctx, next) => {
    ctx.body = 'hello koa';
    console.log(ctx.req.url); // /a
    console.log(ctx.request.url); // /a
    console.log(ctx.request.req.url); // /a
    console.log(ctx.url); // /a
    // http://localhost:3000/a?name=1
    // ctx的req属性就是原生node中Http模块的req参数

    // path属性原生的req上并没有，是koa的request自己扩展的
    // console.log(ctx.req.path); // undefined  ctx.req = req
    // console.log(ctx.request.path); // /a ctx.request是koa自己封装的属性
    // console.log(ctx.request.req.path); // undefined  ctx.request.req = req
    // console.log(ctx.path);// /a 用ctx来代理一下ctx.request属性
});
app.listen(3000, () => {
    console.log('server run 3000');
});