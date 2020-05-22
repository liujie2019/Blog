var http = require('http');
var server = http.createServer();
var qs = require('querystring');
server.on('request', (req, res) => {
    console.log(req.url); // /api?user=liujie
    var params = qs.parse(req.url.substring(2));
    // 写入cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=b.baidu.com;HttpOnly'   // HttpOnly:脚本无法读取
    });
    res.write(JSON.stringify(params));
    res.end();
});
server.listen(8001, () => {
    console.log('Server is running at port 8001...');
});