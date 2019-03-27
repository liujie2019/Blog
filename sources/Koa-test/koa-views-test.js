const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const app = new Koa();

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

app.use(async ctx => {
    const title = 'hello koa2';
    const name = 'liujie';
    // render方法的第一个参数为要渲染的模板引擎名称
    await ctx.render('test', {
        title,
        name
    });
});

app.listen(8088, () => {
    console.log('server start at port 8088');
});