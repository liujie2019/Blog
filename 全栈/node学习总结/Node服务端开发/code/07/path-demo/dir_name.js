const fs = require('fs');
const path = require('path');

// /Users/liujie26/study/Blog/全栈/node学习总结/Node服务端开发/code/path-demo
console.log(__dirname); // 返回当前文件所在的文件夹目录
// /Users/liujie26/study/Blog/全栈/node学习总结/Node服务端开发/code/path-demo/dir_name.js
console.log(__filename); // 返回当前文件所在的目录
// /Users/liujie26/study/Blog/全栈/node学习总结/Node服务端开发/code/path-demo/dir_name.js
console.log(path.join(__dirname, './dir_name.js'));
fs.readFile(path.join(__dirname, './dir_name.js'), (err, data) => {
    if (err) {
        throw err;
    }
    // console.log(data.toString());
});