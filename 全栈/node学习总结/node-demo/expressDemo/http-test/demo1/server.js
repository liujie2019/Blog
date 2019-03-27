const http = require('http');

const parsePostBody = (req, done) => {
    const arr = [];
    let chunks;
    req.on('data', buff => {
        arr.push(buff);
    });
    req.on('end', () => {
        chunks = Buffer.concat(arr);
        done(chunks);
    });
};

const server = http.createServer((req, res) => {
    parsePostBody(req, (chunks) => {
        const body = chunks.toString();
        res.end(`Your nick is ${body}`);
    });
});
server.listen(3000, () => {
    console.log('服务监听在3000端口');
});
