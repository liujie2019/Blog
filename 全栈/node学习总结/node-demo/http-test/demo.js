const http = require('http');

/**
response.write 是可以写多个的。

比如：
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
 */
const server = http.createServer((request, response) => {
    console.log('Request received');
    // 设置响应头
    // 设置响应内容的格式(纯文本)
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    // 设置响应的内容
    response.write('Hello from out application');
    response.end();
});

server.listen(3000, '127.0.0.1');
console.log('Server started on localhost port 3000');