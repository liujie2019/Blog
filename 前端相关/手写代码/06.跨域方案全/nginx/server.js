const express = require('express');
const app = express();
// 以static目录作为静态资源目录
app.use(express.static('static'));

app.listen(8097, () => {
    console.log('server run at port 8097');
});