const express = require('express');
const app = express();
// 以当前目录作为静态资源目录
app.use(express.static(__dirname));

app.listen(8000, () => {
    console.log('server run at port 8000');
});