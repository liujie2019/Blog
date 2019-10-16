const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
    },
    plugins: [
        new HtmlWebpackPlugin({
           filename: 'test.html',
           template: './src/index.html',
           title: '自动生成html',
           inject: true, // 默认为true，插入到body标签底部
           favicon: './favicon.ico', // 给页面添加favicon
           minify: {
             removeAttributeQuotes: true, // 移除属性的引号
             collapseWhitespace: true // 折叠空行变成一行
           }
        })
    ]
}