const fs = require('fs');
const time = process.hrtime();
const data = fs.readFileSync('./demo.js');
const diff = process.hrtime(time);
console.log(diff); // [ 0, 516897 ]
console.log('读文件操作耗费%d纳秒', diff[0] * 1e9 + diff[1]); // 读文件操作耗费516897纳秒