const Koa = require('koa');
// app可以实现常用的方法 listen use方法
const app = new Koa();

// 洋葱模型
/*
伪代码
(ctx, next) => {
    console.log('hello koa1');
    (ctx, next) => {
        console.log('hello koa3');
        (ctx, next) => {
            console.log('hello koa5');
            next();
            console.log('hello koa6');
        }()
        console.log('hello koa4');
    }()
    console.log('hello koa2');
}
*/


app.use((ctx, next) => {
    console.log('1');
    next();
    console.log('2');
});
app.use((ctx, next) => {
    console.log('3');
    next();
    console.log('4');
});
app.use((ctx, next) => {
    console.log('5');
    next();
    console.log('6');
});
app.listen(3000, () => {
    console.log('server run 3000');
});
// 1 3 5 6 4 2