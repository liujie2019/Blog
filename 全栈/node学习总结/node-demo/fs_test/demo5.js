// 创建和删除目录

const fs = require('fs');

fs.mkdir('dist', () => {
    fs.readFile('test.txt', 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        }
        fs.writeFile('./dist/writeMe.txt', data, () => {
            console.log('复制文件成功');
        });
    });
});