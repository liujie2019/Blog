const fs = require('fs');

// 第一个参数是文件路径
// 第二个参数是要写入的内容
// 第三个参数是回调函数
// 写入成功，error是null，写入失败，error就是错误对象
fs.writeFile('../data/test2.txt', '大家好', error => {
    console.log(error); // null
    if (error) {
        console.log('写入失败');
    } else {
        console.log('写入成功');
    }
});