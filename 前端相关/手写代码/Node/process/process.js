const http = require('http');

const server = http.createServer();
server.listen(8080, () => {
    process.title = 'liujie进程测试';
    console.log('process id', process.pid);
});