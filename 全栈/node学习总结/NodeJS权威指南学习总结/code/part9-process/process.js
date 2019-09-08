const http = require('http');

const server = http.createServer();
server.listen(3000, () => {
    process.title = '进程服务测试';
    console.log('进程id：', process.pid); // 进程id： 73451
});