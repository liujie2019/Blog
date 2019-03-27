const express = require('express');
const app = express();
app.use(express.static('./dist'));

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <h1>hello express!</h1>
    </body>
    </html>`);
});
app.get('/react', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div id="btn">btn</div>
      <script src="./main.js"></script>
    </body>
    </html>`);
});
app.listen('6066', () => {
    console.log('服务启动在6066端口');
});