const fs = require('fs');
const data = '我是要写入文件的数据';

// 创建可写流
const writerStream = fs.createWriteStream('output.txt');
// 使用utf8编码写入数据
writerStream.write(data, 'utf8');

// 标记文件末尾
writerStream.end();

// 处理流事件--> finish, error
writerStream.on('finish', () => {
    console.log('写入完成');
});

writerStream.on('error', (err) => {
    console.log(err.stack);
});
console.log('程序执行完毕');