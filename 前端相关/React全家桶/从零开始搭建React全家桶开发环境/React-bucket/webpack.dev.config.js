const path = require('path');

module.exports = {
    // 入口文件
    entry: path.resolve(__dirname, 'src/index.js'),
    // 输出到dist文件夹，输出文件名称为bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};