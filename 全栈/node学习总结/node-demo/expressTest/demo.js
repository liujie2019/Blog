const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.send('你好');
}); 
app.listen('8088', '127.0.0.1');