const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/compute') {
        const compute = fork('./fork_compute.js');
        compute.send('开启子进程了');

        // 子进程使用process.send()发送消息时会触发message事件
        compute.on('message', data => {
            res.end(`Sum is ${data}`);
            compute.kill();
        });
        // 子进程监听到错误消息时退出
        compute.on('close', (code, signal) => {
            console.log(`触发了close事件，子进程收到信号${signal}终止了，退出码为${code}`);
            compute.kill();
        });
    } else {
        res.end('ok');
    }
});

server.listen(8080, () => {
    console.log('server is running at port 8080');
});