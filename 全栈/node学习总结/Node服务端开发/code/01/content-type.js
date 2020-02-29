// http模块用来构建web服务器
// 引入该模块
const http = require('http');
// 使用http.createServer()方法创建一个web服务器
// 返回一个Server实例
const server = http.createServer();
server.on('request', (request, response) => {
    console.log('收到客户端请求了', request.url);
    let url = request.url;
    if (url === '/plain') {
        // text/plain就是普通文本
        response.setHeader('Content-Type', 'text/plain;charset=utf-8');
        response.end('你好666');
    } else if (url === '/html') {
        // 如果发送html格式的字符串
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end('<h2>我是html</h2>');
    } else if (url === '/html-plain') {
        response.setHeader('Content-Type', 'text/plain;charset=utf-8');
        response.end('<h2>我是html<a href="www.baidu.com">点点点</a></h2>');
    }
});

// 绑定端口，启动服务器
server.listen(8088, () => {
    console.log('服务监听在8088端口');
});
