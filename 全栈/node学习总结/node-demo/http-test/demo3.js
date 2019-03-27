const http = require('http');
const fs = require('fs');

const onRequest = function(request, response) {
    console.log('Request received');
    // 设置响应内容为html
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(response);
}

const server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1');
console.log('Server started on localhost port 3000');