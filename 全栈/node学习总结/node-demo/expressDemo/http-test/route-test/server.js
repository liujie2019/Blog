const http = require('http');
const url = require('url');

function start() {
    function onRequest(req, res) {
        console.log(req.url);
        console.log(url.parse(req.url));
        const pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('hello express');
        res.end();
    }
    http.createServer(onRequest).listen(8089, () => {
        console.log("Server has started.");
    });
}
exports.start = start;