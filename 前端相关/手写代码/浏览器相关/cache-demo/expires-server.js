const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
const port = 8089;
app.use(async (ctx, next) => {
    ctx.set('Expires', new Date(Date.now() + 20000).toGMTString());
    await next();
});

app.use(static(path.join(__dirname, './static')));
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});