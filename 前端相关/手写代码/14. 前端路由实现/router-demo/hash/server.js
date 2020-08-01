const Koa = require('koa');
const path = require('path');
const fs = require('fs.promised');
const static = require('koa-static');
const app = new Koa();

const main = async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = await fs.readFile('./h5_router.html', 'utf8');
}
// 设置静态文件访问路径
app.use(static(path.join(__dirname + '/static')));
app.use(main);

app.listen(8090, () => {
    console.log('server is start at 8090');
});