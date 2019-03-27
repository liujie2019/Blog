const fs = require('fs');
fs.readdir('./', (err, files) => {
    if (err) console.log('读取目录操作失败');
    else console.log(files); // [ 'demo.js', 'part4', 'part5', 'part6' ]
    // files是一个数组，存放了读取到的文件中的所有文件名
});