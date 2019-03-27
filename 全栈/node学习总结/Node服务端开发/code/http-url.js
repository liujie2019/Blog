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
    let msg = '';
    const url = request.url;
    console.log('收到客户端请求了', request.url);
    // 设置响应头，解决中文乱码问题
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    // response对象的write方法用来给客户端发送响应
    // write可以使用多次，但是最后一定要用end方法来结束响应，否则客户端会一直等待
    // 根据不同的请求路径返回不同信息
    if (url === '/') {
        msg = '首页';
    }
    else if (url === '/login') {
        msg = '登录';
    }
    else if (url === '/register') {
        msg = '注册';
    }
    else if (url === '/user') {
        msg = [
            {
                name: 'lisi',
                age: 20
            }, {
                name: 'wamhwu',
                age: 30
            }
        ]
    }
    else {
        msg = '404 not found';
    }
    // response.write(msg);
    // response.end();
    // 发送数据同时结束响应
    // response.end(msg);
    // 需要注意：响应内容只能是二进制或者字符串，不能是数组、对象、数字或者布尔值
    // 否则报错：TypeError: First argument must be a string or Buffer
    response.end(JSON.stringify(msg));
});

// 绑定端口，启动服务器
server.listen(8088, () => {
    console.log('服务监听在8088端口');
});
