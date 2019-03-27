const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

// 使用koa-bodyparser中间件
app.use(bodyParser());
app.use(async (ctx) => {
    if(ctx.url === '/' && ctx.method === 'GET') {
        // 当GET请求时返回表单页面
        ctx.body = `
            <h1>koa-bodyparser</h1>
            <form method="post" action="/">
                姓名：<input name="name" /><br>
                年龄：<input name="age" /><br>
                邮箱：<input name="email" /><br>
                <button type="submit">提交</button>
            </form>
        `;
    }
    else if(ctx.url === '/' && ctx.method === 'POST') {
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里面的数据，并展示出来
        ctx.body = ctx.request.body;
    }
    else {
        ctx.body = '<h1>404 Not Found</h1>';
    }
});

app.listen(3000);