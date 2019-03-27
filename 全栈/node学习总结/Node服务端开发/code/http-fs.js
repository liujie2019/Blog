// http模块用来构建web服务器
// 引入该模块
const http = require('http');
const fs = require('fs');
// 使用http.createServer()方法创建一个web服务器
// 返回一个Server实例
const server = http.createServer();

server.on('request', (request, response) => {
    console.log('收到客户端请求了', request.url);
    let url = request.url;
    // 设置响应头，解决中文乱码问题
    if (url === '/') {
        fs.readFile('../views/http.html', (error, data) => {
            if (error) {
                response.setHeader('Content-Type', 'text/plain;charset=utf-8');
                response.end('文件读取失败，请稍后重试');
            }
            else {
                // data默认是二进制数据，可以通过toString方法转化为咱们能识别的字符串
                // response.end()支持两种数据，一种是二进制，一种是字符串
                response.setHeader('Content-Type', 'text/html;charset=utf-8');
                response.end(data);
            }
        });
    } else if (url === '/tabable') {
        // url：统一资源定位符
        // 一个url最终其实是要对应到一个资源的
        fs.readFile('../views/Tabable.png', (error, data) => {
            if (error) {
                response.setHeader('Content-Type', 'text/plain;charset=utf-8');
                response.end('图片读取失败，请稍后重试');
            }
            else {
                // data默认是二进制数据，可以通过toString方法转化为咱们能识别的字符串
                // response.end()支持两种数据，一种是二进制，一种是字符串
                // 图片就不需要指定编码了，因为常说的编码是字符编码
                response.setHeader('Content-Type', 'image/png');
                response.end(data);
            }
        });
    }
});

// 绑定端口，启动服务器
server.listen(8088, () => {
    console.log('服务监听在8088端口');
});
