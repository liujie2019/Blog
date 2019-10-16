const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // {
            //     test: require.resolve('jquery'),
            //     use: [
            //         {
            //             loader: 'expose-loader',
            //             options: '$'
            //         }, {
            //             loader: 'expose-loader',
            //             options: 'jQuery'
            //         }
            //     ]
            // }
        ]
    },
    // devServer基于HtmlWebpackPlugin在内存中生成了相应的html文件
    devServer: {
        port: 3000,
        progress: true, // 显示打包进度条
        contentBase: './dist', // 指定服务地址
        open: true, // 自动打开浏览器
        compress: true // 压缩
    },
    // externals: {
    //     jquery: 'jQuery'
    // },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new HtmlWebpackPlugin({
           filename: 'index.html',
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