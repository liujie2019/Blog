const net = require('net');
const server = net.createServer((socket) => {
    console.log('客户端与服务端连接已经建立');
});
server.listen(8431, 'localhost', () => {
    console.log('服务端开始监听');
    const address = server.address();
    console.log('被监听的地址信息为%j', address);
});