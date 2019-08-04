const express = require('express');
const app = express();
// 以当前目录作为静态资源目录
app.use(express.static(__dirname));

const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 3000});
wss.on('connection', function(ws) {
    ws.on('message', function(data) {
        console.log(data);
        ws.send('我是服务端');
    });
});

app.listen(5000, () => {
    console.log('server run at port 5000');
});