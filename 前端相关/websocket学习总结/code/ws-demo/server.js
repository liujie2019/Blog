const express = require('express');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({port: 8089});

wss.on('connection', function connection(ws) {
    console.log('server: receive connection.');
    ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
    });
    ws.send('world');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('server listen at port 3000');
});
