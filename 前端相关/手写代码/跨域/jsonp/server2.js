const http = require('http');
const qs = require('querystring');
const server = http.createServer();

server.on('request', (req, res) => {
    const queryData = qs.parse(req.url.split('?')[1]);
    // console.log(queryData); // { user: 'admin', callback: 'show' }
    // jsonp返回设置
    const {callback, user} = queryData;
    const data = JSON.stringify({user: '我是服务端'});
    res.writeHead(200, {
        // 'Content-Length': Buffer.byteLength(data),
        'Content-Type': 'text/plain;charset=utf-8'
    });
    res.write(`${callback}(${data})`);
    res.end();
});

server.listen(3000, () => {
    console.log('server run port 3000');
});