const https = require('https');
const fs = require('fs');
const pk = fs.readFileSync('./privatekey.pem');
const pc = fs.readFileSync('./certificate.pem');

const opts = {
    key: pk,
    cert: pc
};
const server = https.createServer(opts, (req, res) => {
    console.log(req.url);
    if(req.url !== '/favicon.ico') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><meta charset="utf-8"/></head>');
        res.write('你好, https');
        res.end();
    }
});

server.listen(443, 'localhost', () => {
    console.log('https服务器端开始监听！');
});