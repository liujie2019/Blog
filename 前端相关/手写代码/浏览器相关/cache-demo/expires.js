const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

http.createServer((req, res) => {
    const {pathname} = url.parse(req.url, true); // parse的第二个参数表示解析query参数
    console.log(pathname);
    const abs = path.join(__dirname, pathname);
    res.setHeader('Expires', new Date(Date.now() + 120000).toGMTString());
    fs.stat(path.join(__dirname, pathname), (err, stat) => {
        if(err) {
            res.statusCode = 404;
            res.end('not found');
            return;
        }
        if(stat.isFile()) {
            fs.createReadStream(abs).pipe(res);
        }
    })
}).listen(3000, () => {
    console.log('Server is running at 3000');
});
