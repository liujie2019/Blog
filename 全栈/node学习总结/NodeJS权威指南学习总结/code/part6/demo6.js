// 使用流读取数据
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
// 暂停文件读取操作
file.pause();
file.on('data', (data) => {
    console.log('读取到数据：');
    console.log(data.toString());
});
// 1秒后恢复文件读取操作
setTimeout(() => {
    file.resume();
}, 1000);
file.on('error', (err) => {
    console.log('文件读取失败');
});