const http = require('http');
const hostname = '0.0.0.0';
const port = 8058;
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
const server = http.createServer((req, res) => {
    console.log('Request received');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World66666\n');
    // 设置响应头
    // 设置响应内容的格式(纯文本)
    // response.writeHead(200, { 'Content-Type': 'text/plain' });
    // 设置响应的内容
    // response.write('Hello from out application');
    // response.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
