// 浏览器中的js没有文件操作能力
// 但是Node中的js具有文件操作能力

// fs是file-system的简写，就是文件系统的意思
// 在Node中如果想要进行文件操作，就必须引入fs这个核心模块
// 在fs这个核心模块中，就提供了所有的文件操作相关的API
// 例如：fs.readFile就是用来读取文件的

// 使用require方法加载fs核心模块
const fs = require('fs');
// 读取文件
// 第一个参数是要读取的文件路径
// 第二个参数是回调函数
// error：读取失败，error就是错误对象，读取成功，error就是null
// data：读取失败，data就是undefined，读取成功，data就是读取的数据
fs.readFile('../data/test.txt', (error, data) => {
    // 输出<Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73>
    // 说明文件中存储的其实是二进制数据0和1
    // 这是不是0和1，因为是二进制转为16进制了
    if (error) { // 错误处理
        console.log('读取文件失败');
    } else {
        console.log(data);
        // 通过toString方法转化为相应内容
        console.log(data.toString()); // hello nodejs
    }
});