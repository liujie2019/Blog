const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const static = require('koa-static');
const views = require('koa-views')

const app = new Koa();

const main = async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./view/historyRouter.html');
}

app.use(static(path.join(__dirname + '/static')));
app.use(main);

app.listen(8091, () => {
    console.log('server is running at 8091');
});