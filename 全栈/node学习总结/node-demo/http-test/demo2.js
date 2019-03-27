const http = require('http');

const onRequest = function(request, response) {
    console.log('Request received');
    // 设置返回json格式的数据
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const myObj = {
        name: "zhaoliu",
        job: "programmer",
        age: 27
    };
    response.end(JSON.stringify(myObj));
}

const server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1');
console.log('Server started on localhost port 3000');