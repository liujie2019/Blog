const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url !== '/favicon.ico') {
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
        });
        res.write('你好');
    }
    res.end();
});

server.listen(8089, () => {
    console.log('Server running at http://127.0.0.1:8089');
});