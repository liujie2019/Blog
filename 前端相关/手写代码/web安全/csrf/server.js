const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('index.html');
});

app.listen(8093, () => {
    console.log('server is run at port 8093');
});