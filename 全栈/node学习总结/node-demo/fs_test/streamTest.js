const fs = require('fs');
let data = '';

// 创建可读流
const readerStream = fs.createReadStream('test.txt');
// 设置编码为utf8
readerStream.setEncoding('utf8');
// 处理流事件--> data, end, error

readerStream.on('data', (chunk) => {
    data += chunk;
});

readerStream.on('end', () => {
    console.log(data);
});

readerStream.on('error', (err) => {
    console.log(err.stack);
});
console.log('程序执行完毕');