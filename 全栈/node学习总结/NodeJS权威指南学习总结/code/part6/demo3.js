// 追加数据
const fs = require('fs');
fs.appendFile('./test.txt', '我是追加的数据', 'utf8', (err) => {
    if (err) console.log('追加文件操作失败');
    else console.log('追加文件操作成功');
});