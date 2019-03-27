const net = require('net');
const server = net.createServer(function(socket) {
	console.log('客户端与服务器端连接建立成功');
});
server.listen(8431, 'localhost', function() {
	address = server.address();
	console.log('服务器端开始监听');
	console.log('被监听的地址信息为%j', address);
});
server.on('error', function(e) {
	if (e.code === 'EADDRINUSE') {
		console.log('服务器地址及端口已经被占用');
	}
});