const http = require('http');
const server = http.createServer((req, res) => {
    res.end();
}).listen(8088, '127.0.0.1', () => {
    console.log('服务器端开始监听');
});