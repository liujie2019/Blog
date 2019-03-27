const express = require('express');

const app = express();

function middleware1(req, res, next) {
    req.message = 'hello from middleware1\n';
    next();
}

function middleware2(req, res, next) {
    req.message += 'hello from middleware2\n';
    next();
}

app.get('/', middleware1, middleware2, function(req, res, next) {
    res.send(req.message += 'hello from middleware3');
});

app.get('/user', function(req, res, next) {
    res.send('hello lisi');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
    // console.log('express server listening at http://%s:%s', host, port);
});