const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['lodash'],
        react: ['react', 'react-dom']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'), // 将dll文件打包到根目录下的dll文件夹下
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json')
        })
    ]
}