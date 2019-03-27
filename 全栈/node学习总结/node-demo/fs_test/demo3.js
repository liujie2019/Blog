const fs = require('fs');

// 同步读取
fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log('异步读取：' + data.toString());
});

console.log('done');