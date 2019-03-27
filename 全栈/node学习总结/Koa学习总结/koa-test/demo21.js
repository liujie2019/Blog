const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = `
        <ul>
            <li><a href="/hello">hello world</a></li>
            <li><a href="/about">hello about</a></li>
        </ul>
    `;
}).get('/hello', async (ctx) => {
    ctx.body = 'hello world';
}).get('/about', async (ctx) => {
    ctx.body = 'hello about';
});

app.use(router.routes(), router.allowedMethods());
app.listen(3000);