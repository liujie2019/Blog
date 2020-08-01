const Koa = require('./koa/application');
const app = new Koa();

// koa可以使用async await
const log = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('ok了');
            resolve();
        }, 1000);
    });
}
// 这些中间件会形成一个promise
app.use(async (ctx, next) => {
    console.log('hello koa1');
    // await会等待下一个中间件执行完毕后再继续执行
    await next();
    console.log('hello koa2');
});
app.use(async (ctx, next) => {
    console.log('hello koa3');
    await log(); // 调用await就会等待异步操作执行完毕后再继续执行
    await next();
    console.log('hello koa4');
});
app.use(async (ctx, next) => {
    console.log('hello koa5');
    await next();
    console.log('hello koa6');
});

app.listen(3000, () => {
    console.log('server run 3000');
});
// 输出如下：
/*
hello koa1
hello koa3
ok
hello koa5
hello koa6
hello koa4
hello koa2
*/