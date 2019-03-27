const Koa = require('koa');
const app = new Koa();
const path = require('path');
const static = require('koa-static');

app.use(static(path.join(__dirname)));

app.listen(8088, () => {
    console.log('server start at port 8088');
});