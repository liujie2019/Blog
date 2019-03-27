const Koa = require('koa');
const app = new Koa();

// 中间件1
app.use(async (ctx, next) => {
    console.log(1);
    next(); // 中间件1暂停执行，并将执行权交给中间件2
    console.log(2); // 中间件1继续执行
});
// 中间件2
app.use(async (ctx, next) => {
    console.log(3);
    next(); // 中间件2暂停执行，并将执行权交给中间件3
    console.log(4); // 中间件2继续执行，并将执行权返还给中间件1
});
// 中间件3
app.use(async (ctx, next) => {
    console.log(5);
    next(); // 中间件3暂停执行
    console.log(6); // 因为没有后续中间件，中间件3继续执行，并将执行权返还给中间件2
});

app.listen(8088, () => {
    console.log('server start at port 8088');
});