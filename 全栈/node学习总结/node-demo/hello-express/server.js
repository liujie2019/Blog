const express = require('express');
const app = express();

// 回调函数
// send方法可以返回纯文本，json，数组等
app.get('/', (req, res) => {
    // res.send('this is express demo 111'); // 返回纯文本
    const resObj = {
        name: 'lisi',
        age: 22
    };
    res.send(resObj); // 返回json
});

app.listen(3000);
console.log('listening to port 3000');
