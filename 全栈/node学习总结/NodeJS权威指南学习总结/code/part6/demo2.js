// 同步文件读取
const fs = require('fs');
try {
    const data = fs.readFileSync('./test.txt', 'utf8');
    console.log(data);
} catch (error) {
    console.log('读取文件时发生错误');
}