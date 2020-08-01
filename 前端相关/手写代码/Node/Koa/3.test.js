function app() {}
app.middlewares = [];
app.use = function(callback) {
    app.middlewares.push(callback);
}

// 模拟洋葱模型
app.use((ctx, next) => {
    console.log('hello koa1');
    next();
    console.log('hello koa2');
});
app.use((ctx, next) => {
    console.log('hello koa3');
    next(); // 假如这里没有next，将不会向下执行了
    console.log('hello koa4');
});
app.use((ctx, next) => {
    console.log('hello koa5');
    next();
    console.log('hello koa6');
});

function dispatch(index) {
    // 防止越界
    if (app.middlewares.length === index) return;
    // 先取出第一个中间件，让其执行，将索引递增，调用next，就是将下一个中间件，继续执行
    const middleware = app.middlewares[index];
    // () => dispatch(index + 1)就是next方法，dispatch(index + 1)即执行下一下中间件
    // 执行取出的中间件
    middleware({}, () => dispatch(index + 1));
}
// 让第一个中间件执行
dispatch(0);