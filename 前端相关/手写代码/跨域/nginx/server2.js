var http = require('http');
var server = http.createServer();
var qs = require('querystring');
server.on('request', function(req, res) {
    console.log(req.url); // /api?user=liujie
    var params = qs.parse(req.url.substring(2));
    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=b.baidu.com;HttpOnly'   // HttpOnly:脚本无法读取
    });
    res.write(JSON.stringify(params));
    res.end();
});
server.listen(8000);
console.log('Server is running at port 8000...');