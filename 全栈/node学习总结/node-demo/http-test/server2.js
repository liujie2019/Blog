const http = require('http');
const fs = require('fs');

function startServer() {
    const onRequest = (request, response) => {
        console.log('Request received ' + request.url);
        if (request.url === '/' || request.url === '/home') {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(response);
        }
        else if (request.url === '/review') {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(__dirname + '/review.html', 'utf8').pipe(response);
        }
        else if (request.url === '/api/v1/records') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            const jsonObj = {
                name: "lisi"
            };
            response.end(JSON.stringify(jsonObj));
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(response);
        }
    }
    const server = http.createServer(onRequest);
    server.listen(3000, '127.0.0.1');
    console.log('Server started on localhost port 3000');
}

exports.startServer = startServer;