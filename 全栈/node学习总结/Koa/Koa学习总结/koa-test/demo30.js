const Koa  = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    if(ctx.url === '/index'){
        ctx.cookies.set(
            'name','liujie'
        );
        ctx.body = 'cookie is ok';
    }
    else {
        ctx.body = 'hello world';
    }
});

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000');
})