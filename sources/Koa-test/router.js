const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    let _html = '';
    switch(ctx.url) {
        case '/':
            _html = '<h1>hello koa</h1>';
            break;
        case '/user':
            _html = {
                name: 'lisi',
                age: 22
            };
            break;
        case '/404':
            _html = '404 not found';
            break;
        default:
            _html = '默认';
    }
    ctx.body = _html;
});

app.listen(8088, () => {
    console.log('server is starting at port 8088');
});