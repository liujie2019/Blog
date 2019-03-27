// 异步文件读取
const fs = require('fs');
fs.readFile('./test.txt', 'utf8' , (err, data) => {
    if (err) console.log('读取文件时发生错误');
    else { // 在控制台中输出文件内容
        console.log(data); // data中是存取了文件原始二进制数据的缓存区中的内容
        console.log(data.toString()); // 将文件内容以字符串的形式输出
    }
});