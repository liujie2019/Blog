const http = require('http');
const fs = require('fs');
const port = 8000;
http.createServer((request, response) => {
  console.log('request url: ', request.url);
  const html = fs.readFileSync('./connection.html', 'utf-8');
  const img = fs.readFileSync('./debug.png');
  if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  } else {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.end(img);
  }
}).listen(port);
console.log('server listening on port ', port);