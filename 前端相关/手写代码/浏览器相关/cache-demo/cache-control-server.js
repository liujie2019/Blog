const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
const port = 8089;
app.use(async (ctx, next) => {
    ctx.set({
        'Cache-Control': 'max-age=100'
    });
    await next();
});

app.use(static(path.join(__dirname, './static')));
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});