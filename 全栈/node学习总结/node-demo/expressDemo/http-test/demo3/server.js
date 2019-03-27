const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(pathname);
    fs.readFile(pathname.substr(1), (err, data) => {
        if(err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        }
        // 响应文件内容
        res.write(data.toString());
        // 发送响应数据
        res.end();
    });
});

server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});