const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// create application/json parser
// 处理json格式
const jsonParser = bodyParser.json();

// 处理表单
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});

app.post('/', urlencodedParser, (req, res) => {
    console.dir(req.body);
    res.send(req.body.name);
});

app.post('/upload', jsonParser, (req, res) => {
    console.dir(req.body);
    res.send(req.body.name);
});

app.get('/profile/:id/user/:name', (req, res) => {
    console.dir(req.params);
    res.send("You requested to see a profile with the name of " + req.params.name);
});

app.get('/ab?cd', (req, res) => {
    res.send('/ab?cd');
})

app.listen(3000);
console.log('listening to port 3000');