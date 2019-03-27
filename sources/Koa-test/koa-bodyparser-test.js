const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// 加载中间件
app.use(bodyParser());
app.use(async ctx => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        const html = `
            <h1> Koa2 post request demo</h1>
            <form method="POST" action="/">
                <label>用户名：</label>
                <input name="userName" /> <br/>
                <label>年龄：</label>
                <input name="age" /> <br/>
                <label>邮箱：</label>
                <input name="email" /> <br/>
                <button type="submit">提交</button>
            </form>
        `;
        ctx.body = html;
    }
    else if (ctx.url === '/' && ctx.method === 'POST') {
        ctx.body = ctx.request.body;
    }
    else {
        ctx.body = '<h1>404 not found</h1>';
    }
});

app.listen(8088, () => {
    console.log('server is starting at port 8088');
});
