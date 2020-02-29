// http模块用来构建web服务器
// 引入该模块
// return 有两个作用：1. 方法返回值；2. 阻止代码继续往后执行
const http = require('http');
const fs = require('fs');
// 使用http.createServer()方法创建一个web服务器
// 返回一个Server实例
const server = http.createServer();

// let wwwDir = '/Library/WebServer/Documents/test';
const wwwDir = '/Users/liujie26/study/www';
server.on('request', (req, res) => {
    console.log('收到客户端请求了', req.url);
    let url = req.url;
    fs.readFile('./template.html', (error, data) => {
        if (error) {
            return response.end('404 Not Found');
        }
        fs.readdir(wwwDir, (err, files) => {
            if (err) {
                return res.end('Can not find www dir.')
            }
            let content = '';
            files.forEach(item => {
                content += `
                <tr>
                    <td data-value="apple/"><a class="icon file" href="/${item}">${item}</a></td>
                    <td class="detailsColumn" data-value="0"></td>
                    <td class="detailsColumn" data-value="1509589967">2020/02/16 上午10:32:47</td>
                </tr>
                `;
            });
            data = data.toString(); // 将二进制数据转为字符串
            data = data.replace('^_^', content);
            res.end(data);
        });
    });
});

// 绑定端口，启动服务器
server.listen(8093, () => {
    console.log('服务监听在8093端口');
});
