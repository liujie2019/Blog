// http模块用来构建web服务器
// 引入该模块
// return 有两个作用：1. 方法返回值；2. 阻止代码继续往后执行
const http = require('http');
const fs = require('fs');
// 使用http.createServer()方法创建一个web服务器
// 返回一个Server实例
const server = http.createServer();

let wwwDir = '/Users/liujie26/study/www';

/*
/ -> wwwDir + /index.html
/hello.txt -> wwwDir + /hello.txt
/login/index.html -> wwwDir + /login/index.html
*/
server.on('request', (request, response) => {
    console.log('收到客户端请求了', request.url);
    let url = request.url;
    let filePath = '/index.html';
    if (url !== '/') {
        filePath = url;
    }
    // 请求到对应的路径的时候，去wwwDir目录下读取相应的文件并返回
    fs.readFile(wwwDir + filePath, (error, data) => {
        if (error) {
            return response.end('404 Not Found');
        }
        // 设置响应头，解决中文乱码问题
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end(data);
    });
});

// 绑定端口，启动服务器
server.listen(8090, () => {
    console.log('服务监听在8090端口');
});
