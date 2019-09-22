const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use('/', proxy({
    target: 'http://b.baidu.com:8000',
    changeOrigin: true,
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://a.baidu.com:81');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'a.baidu.com'  // 可以为false，表示不修改
}));

app.listen(8097, () => {
    console.log('server running on port 8097');
});