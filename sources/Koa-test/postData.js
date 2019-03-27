const Koa = require('koa');
const app = new Koa();

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
        const postData = await parsePostData(ctx);
        ctx.body = postData;
    }
    else {
        ctx.body = '<h1>404 not found</h1>';
    }
});

// 解析Node原生POST参数
function parsePostData(ctx) {
    return new Promise((resovle, reject) => {
        try {
            let postData = '';
            // 监听data事件
            ctx.req.addListener('data', data => {
                postData += data;
            });
            // 监听end事件
            ctx.req.addListener('end', () => {
                const parseData = parseQueryStr(postData);
                resovle(parseData);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function parseQueryStr(queryStr) {
    const queryData = {};
    // queryStr是类似于这样的userName=liujie&age=11&email=1234%40qq.com字符串
    const queryStrList = queryStr.split('&'); // 将得到的字符串转为数组
    // 遍历数组
    for (let item of queryStrList) {
        let itemList = item.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}

app.listen(8088, () => {
    console.log('server is starting at port 8088');
});
