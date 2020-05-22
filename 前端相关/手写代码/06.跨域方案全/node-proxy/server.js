const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use('/', proxy({
    target: 'http://localhost:4000',
    changeOrigin: true,
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
        res.header('Access-Control-Allow-Methods', 'GET');
        // res.header('Access-Control-Allow-Credentials', 'true'); // 设置携带cookie
    }

    // 修改响应信息中的cookie域名
    // cookieDomainRewrite: 'http://127.0.0.1:5501'  // 可以为false，表示不修改
}));

app.listen(3000, () => {
    console.log('server running on port 3000');
});
