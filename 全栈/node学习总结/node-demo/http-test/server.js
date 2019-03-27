// 封装server
const http = require('http');
const fs = require('fs');

function startServer() {
    const onRequest = function(request, response) {
        console.log('Request received');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        const myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
        // response.write('Hello from out application');
        myReadStream.pipe(response);
    }

    const server = http.createServer(onRequest);

    server.listen(3000, '127.0.0.1');
    console.log('Server started on localhost port 3000');
}

exports.startServer = startServer;