const fs = require('fs');
fs.link('./test.txt', './test/message.txt', (err) => {
    if (err) console.log('创建硬链接操作失败');
    else console.log('创建硬链接操作成功');
});