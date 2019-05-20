const Koa = require('koa');
const render = require('koa-art-template');
const path = require('path');
const session = require('koa-session');
const router = require('./router');
const app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html'
});

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
};

app.use(session(CONFIG, app));

app.use(router.routes());

app.listen(8093, () => {
    console.log('Server is run at port 8093');
});