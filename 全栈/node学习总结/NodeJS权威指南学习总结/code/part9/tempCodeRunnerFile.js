const fs = require('fs');
function finish() {
    console.log('文件读取失败');
}
process.nextTick(finish);
console.log(fs.readFileSync('./nextTick2.js').toString());