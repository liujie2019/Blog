// 使用JS包装readFile
// https://www.imooc.com/video/16628


const fs = require('fs');

module.exports = {
    readDir: function (path, options) {
        return new Promise( resolve => {
            fs.readdir(path, options, (err, files) => {
                if (err) {
                    throw err; // 读取失败则抛出错误
                }
                resolve(files);
            });
        });
    },
    readFile: function (path, options) {
        return new Promise( resolve => {
            fs.readFile(path, options, (err, content) => {
                if (err) {
                    throw err;
                }
                resolve(content);
            });
        });
    }
};