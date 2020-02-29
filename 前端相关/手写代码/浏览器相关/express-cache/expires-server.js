const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const port = 8089;
const app = express();

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h2>Http Cache Demo</h2>
        <script src="/cache.js"></script>
    </body>
    </html>
    `);
});

app.get('/cache.js', (req, res) => {
    const filePath = path.resolve(__dirname, './static/cache.js');
    const content = fs.readFileSync(filePath);
    // 增加Expires响应头
    res.set('Expires', getGLNZ());
    res.end(content);
});

function getGLNZ() {
    return moment().utc().add(1, 'm').format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT';
}

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});