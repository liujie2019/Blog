const net = require('net');
const server = net.createServer(function(socket) {
	server.getConnections(function(err, count) {
		console.log('当前存在%d个客户端连接', count);
		server.maxConnections = 2;
		console.log('TCP服务器的最大连接数为%d', server.maxConnections);
	});
});
server.listen(8431, 'localhost');
console.log('TCP服务器被创建');