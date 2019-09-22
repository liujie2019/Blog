const express = require('express');
const app = express();
// 以当前目录作为静态资源目录
app.use(express.static(__dirname));

const WebSocket = require('ws');
// 用ws模块启动一个websocket服务器，监听了9999端口
const wss = new WebSocket.Server({port: 3000});
// 监听客户端的连接请求  当客户端连接服务器的时候，就会触发connection事件
// socket代表一个客户端，不是所有客户端共享的，而是每个客户端都有一个socket
wss.on('connection', function(socket) {
    // 监听对方发过来的消息
    socket.on('message', function(data) {
        console.log(data);
        socket.send('我是服务端');
    });
});

app.listen(5000, () => {
    console.log('server run at port 5000');
});