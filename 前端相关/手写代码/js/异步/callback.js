/**
 * 异步回调
*/
const fs = require('fs');

console.log('1');
// 异步读取文件内容
fs.readFile('./name.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
console.log('2');
