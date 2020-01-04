const http = require('http');

const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e10; i++) {
        sum += i;
    }
    return sum;
}

const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/compute') {
        const sum = longComputation();
        return res.end(`Sum is ${sum}`);
    } else {
        res.end('ok');
    }
});

server.listen(8080, () => {
    console.log('server is running at port 8080');
});