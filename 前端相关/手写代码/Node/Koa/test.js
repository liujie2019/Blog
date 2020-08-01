// Koa核心非常小，强大的功能依赖中间件，http服务封装，将req和res封装为上下文对象ctx

// Koa是一个类
const Koa = require('koa');
// app可以实现常用的方法 listen use方法
const app = new Koa();

// use方法用来添加中间件
app.use((ctx, next) => {
    ctx.body = 'hello koa';
});
app.listen(3000, () => {
    console.log('server run 3000');
});