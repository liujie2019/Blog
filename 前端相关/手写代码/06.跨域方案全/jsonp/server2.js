const http = require('http');
const qs = require('querystring');
const server = http.createServer();

server.on('request', (req, res) => {
    // req.url.split('?')[1] 获取到查询字符串
    const queryData = qs.parse(req.url.split('?')[1]);
    console.log(queryData); // { user: 'admin', cb: 'show' }
    // jsonp返回设置
    const {cb, user} = queryData;
    const data = JSON.stringify({user});
    const resData = `${cb}(${data})`;
    // console.log(Buffer.byteLength(resData)); // 21
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(resData),
        'Content-Type': 'text/plain;charset=utf-8'
    });
    res.write(resData);
    res.end();
});

server.listen(3000, () => {
    console.log('server run port 3000');
});