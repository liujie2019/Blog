const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('hello express');
});

const server = app.listen(8089, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('当前应用访问地址为: http://%s:%s', host, port);
});