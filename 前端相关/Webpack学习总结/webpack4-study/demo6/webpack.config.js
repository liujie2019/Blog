const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry: {
        app: './src/index.js'
    },
    output: {
        publicPath: __dirname + '/dist/', // 静态资源引用路径或者CDN地址
        path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            jQuery$: path.resolve(__dirname, 'src/jquery-3.4.1.min.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery', // npm
            jQuery: 'jQuery' // 本地js文件
        })
    ]
};