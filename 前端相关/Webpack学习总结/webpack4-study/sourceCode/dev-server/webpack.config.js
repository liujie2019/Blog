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
    // devServer基于HtmlWebpackPlugin在内存中生成了相应的html文件
    devServer: {
        index: 'test.html',
        port: 3000,
        progress: true, // 显示打包进度条
        // contentBase: './dist', // 指定服务地址
        open: true, // 自动打开浏览器
        compress: true, // 压缩,
        // inline: false, // 切换到iframe模式，默认为inline模式
        // lazy: true,
        // noInfo: true, // info: false效果相同,
        // publicPath: '/assets/',
        // useLocalIp: true // 允许浏览器使用本地IP打开
        proxy: {
            changeOrigin: true, // target是域名的话，需要这个参数，
            secure: false, // 设置支持https协议的代理
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
           filename: 'test.html',
           template: './src/index.html',
           title: '自动生成html',
           inject: 'head',
           minify: {
             removeAttributeQuotes: true, // 移除属性的双引号
             collapseWhitespace: true // 折叠空行变成一行
           },
           hash: true // 给插入到模板中的静态资源文件后面加一个hash值
        })
    ]
}