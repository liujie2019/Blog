const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./anotherTest.txt');
file.on('data', (data) => {
    out.write(data);
});
out.on('open', (fd) => {
    console.log('需要被写入的文件已经被打开');
});
file.on('end', () => {
    out.end('再见', () => {
        console.log('文件全部写入完毕');
        console.log('共写入%d字节数据', out.bytesWritten);
    });
});