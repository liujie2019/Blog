const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 8089;
const app = express();

app.use(express.static('static'));
app.get('/', (req, res) => {
    // const obj = {
    //     code: 0,
    //     result: []
    // };
    // res.json(obj);
    res.render('index');
});

// app.get('/cache.js', (req, res) => {
//     // res.status(404).send('404 Not Found');
//     const content = fs.readFileSync('./')
// });

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});