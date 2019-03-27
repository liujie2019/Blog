// http模块用来构建web服务器
// 引入该模块
// return 有两个作用：1. 方法返回值；2. 阻止代码继续往后执行
const http = require('http');
const fs = require('fs');
// 使用http.createServer()方法创建一个web服务器
// 返回一个Server实例
const server = http.createServer();

let wwwDir = './www';
server.on('request', (request, response) => {
    console.log('收到客户端请求了', request.url);
    let url = request.url;
    // 设置响应头，解决中文乱码问题
    if (url === '/') {
        fs.readFile(wwwDir + '/index.html', (error, data) => {
            if (error) {
                return response.end('404 Not Found');
            }
            // response.setHeader('Content-Type', 'text/html;charset=utf-8');
            response.end(data);
        });
    } else if (url === '/a.txt') {
        fs.readFile(wwwDir + '/a.txt', (error, data) => {
            if (error) {
                return response.end('404 Not Found');
            }
            response.setHeader('Content-Type', 'text/plain;charset=utf-8');
            response.end(data);
        });
    } else if (url === '/index.html') {
        fs.readFile(wwwDir + '/index.html', (error, data) => {
            if (error) {
                return response.end('404 Not Found');
            }
            // response.setHeader('Content-Type', 'text/html;charset=utf-8');
            response.end(data);
        });
    } else if (url === '/work/test.html') {
        fs.readFile(wwwDir + '/work/test.html', (error, data) => {
            if (error) {
                return response.end('404 Not Found');
            }
            // response.setHeader('Content-Type', 'text/html;charset=utf-8');
            response.end(data);
        });
    }
});

// 绑定端口，启动服务器
server.listen(8088, () => {
    console.log('服务监听在8088端口');
});
