const http = require('http');
const fs = require('fs');
const url = require('url'); // 处理url
const querystring = require('querystring');

function startServer(route, handle) {
    const onRequest = (request, response) => {
        const pathname = url.parse(request.url).pathname;
        console.log('Request received ' + pathname);
        let data = [];
        request.on("error", (err) => {
            console.error(err);
        }).on("data", (chunk) => {
            data.push(chunk);
        }).on('end', () => {
            if (request.method === "POST") { // 处理post请求
                if (data.length > 1e6) {
                    request.connection.destroy();
                }
                data = Buffer.concat(data).toString();
                console.log(data);
                route(handle, pathname, response, querystring.parse(data));
            }
            else { // 处理get请求
                const params = url.parse(request.url, true).query;
                route(handle, pathname, response, params);
            }
        });
    }

    var server = http.createServer(onRequest);

    server.listen(3000, '127.0.0.1');
    console.log('Server started on localhost port 3000');
}

module.exports.startServer = startServer;