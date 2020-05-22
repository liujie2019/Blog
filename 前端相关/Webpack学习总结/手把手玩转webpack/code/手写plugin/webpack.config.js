const path = require('path');
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin');
const FileListPlugin = require('./plugins/flie-list-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyRightWebpackPlugin(), // 插件使用时都需要new，因为插件本身就是一个class类
        new FileListPlugin({
            name: 'FileListPlugin'
        })
    ]
};