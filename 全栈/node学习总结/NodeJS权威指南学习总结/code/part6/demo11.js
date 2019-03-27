const fs = require('fs');
const file = fs.createReadStream('./test.txt');
const out = fs.createWriteStream('./test4.txt');
file.pipe(out, {end: false});
setTimeout(() => {
    file.unpipe(out); // 取消目标文件的写入操作
    out.end();
}, 10);