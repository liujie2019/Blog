const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Custom template', // 指定生成页面的title
          template: './src/index.html', // 指定模版文件路径
          filename: './index.html' // 生成的html文件的文件名。默认index.html，可以直接配置带有子目录
        })
    ]
};