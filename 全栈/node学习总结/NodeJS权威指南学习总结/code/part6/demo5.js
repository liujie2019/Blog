// 使用流读取数据
const fs = require('fs');
const file = fs.createReadStream('./test.txt');
file.on('open', (fd) => {
    console.log('开始读取文件。');
});
file.on('data', (data) => {
    console.log('读取到数据：');
    console.log(data.toString());
});
file.on('end', () => {
    console.log('文件已全部读取完毕');
});
file.on('close', () => {
    console.log('文件被关闭');
});
file.on('error', (err) => {
    console.log('文件读取失败');
});