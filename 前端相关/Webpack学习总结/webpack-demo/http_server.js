const express = require('express');
const {render} = require('./dist/bundle_server');
const app = express();
// 调用构建出的bundle_server.js中暴露出的渲染函数，再拼接HTML模板，形成完整的HTML文件
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                ${render()}
            </body>
        </html>
    `);
});
// 其他请求路径返回对应的本地文件
app.use(express.static('.'));
app.listen(8088, () => {
    console.log('server listening on port 8088!');
});