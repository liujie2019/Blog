const http = require('http');

const server = http.createServer(function(req, res) {
    res.write('hello world\n');
    //打印当前请求的url
    // res.write(req.url);
    //打印请求头对象
    res.write(JSON.stringify(req.headers));
    res.end();
});

server.listen(3000);