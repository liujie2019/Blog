const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log(req.query);
    res.send('home page：' + req.query.name);
});

// 路由参数
app.get('/profile/:id/user/:name', (req, res) => {
    console.dir(req.params);
    res.send("You requested to see a profile with the name of " + req.params.id + '--' + req.params.name);
});

// ?表示匹配其前面的字符0次或1次
app.get('/ab?cd', (req, res) => {
    res.send('/ab?cd');
});

app.listen(3000);
console.log('listening to port 3000');