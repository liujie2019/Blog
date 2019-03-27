const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: '3000',
    path: '/demo',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'identity'
    }
};
const client = http.request(options, (res) => {
    res.pipe(process.stdout);
});

client.end('liujie');