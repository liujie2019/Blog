const fs = require('fs');
function finish() {
    console.log('文件读取成功');
}
// 使用nextTick方法指定一个函数在一个同步方法执行完毕时被调用
process.nextTick(finish);
console.log(fs.readFileSync('./nextTick2.js').toString());