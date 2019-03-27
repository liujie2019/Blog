// http模块用来构建web服务器
// 引入该模块
const http = require('http');
// 使用http.createServer()方法创建一个web服务器
// 返回一个Server实例
const server = http.createServer();
// 注册request请求事件
// 当客户端发请求时，就会自动触发服务器的request请求事件
// 然后执行第二个参数回调函数进行请求处理
// request请求事件处理函数，需要接收两个参数：
// Request请求对象：用来获取客户端的一些请求信息，例如请求路径
// Response响应对象：用来给客户端发送响应消息
server.on('request', (request, response) => {
    console.log('收到客户端请求了', request.url);
    // 设置响应头，解决中文乱码问题
    response.setHeader('Content-Type', 'text/plain;charset=utf-8');
    // response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    // response对象的write方法用来给客户端发送响应
    // write可以使用多次，但是最后一定要用end方法来结束响应，否则客户端会一直等待
    response.write('你好666');
    // 结束响应
    response.end();
});

// 绑定端口，启动服务器
server.listen(8088, () => {
    console.log('服务监听在8088端口');
});
