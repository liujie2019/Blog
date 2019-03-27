const fs = require('fs');

// 同步读取
const data = fs.readFileSync('test.txt', 'utf8');
console.log(data);
console.log('done');