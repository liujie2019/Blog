const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');

const app = new Koa();
const port = 8089;

app.use(conditional());
app.use(etag());
app.use(static(path.join(__dirname, './static')));

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});