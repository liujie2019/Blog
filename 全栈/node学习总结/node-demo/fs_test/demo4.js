// 创建和删除目录

const fs = require('fs');

console.log('准备删除文件了');
fs.unlink('test.txt', (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log('删除文件成功');
});
console.log('done');