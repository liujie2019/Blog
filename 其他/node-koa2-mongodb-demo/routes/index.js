const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    ctx.body = 'hello koa2';
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 demo';
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        name: 'hello koa222'
    };
});

export default router;