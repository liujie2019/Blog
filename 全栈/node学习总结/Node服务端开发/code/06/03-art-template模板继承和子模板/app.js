const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'))

app.get('/', (req, res) => {
    res.render('index.html');
});


app.listen(3000, () => {
    console.log('server is running at 3000');
});