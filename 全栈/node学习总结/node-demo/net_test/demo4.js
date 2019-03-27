const net = require('net');
const server = net.createServer();
server.on('connection', function(socket) {
	socket.setEncoding('utf-8');
	socket.on('data', function(data) {
		console.log(data);
		console.log('已经接收到%d字节数据', socket.bytesRead);
	});
});
server.listen(8431, 'localhost');