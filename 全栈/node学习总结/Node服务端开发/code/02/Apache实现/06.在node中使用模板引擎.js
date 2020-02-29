const http = require('http');
const fs = require('fs');
const template = require('art-template');

const server = http.createServer();
server.on('request', (req, res) => {
    const url = req.url;
    if (url === '/') {
        fs.readFile('./tpl.html', (error, data) => {
            if (error) {
                console.log('读取文件失败');
            }
            data = data.toString();
            const htmlStr = template.render(data, {
                title: '在Node中使用模板引擎',
                name: '李四',
                age: 12,
                province: '北京',
                hobbies: ['🏀', '⚽️']
            });
            console.log(htmlStr);
            res.end(htmlStr);
        });
    }
});

server.listen(3000, () => {
    console.log('server is running at port 3000');
});