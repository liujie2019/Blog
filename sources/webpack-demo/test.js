const path = require('path');
// html
const htmlWebpackPlugin = require('html-webpack-plugin');
// css分离
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    // 模式
    mode: 'production',
    // 入口文件
    entry: {
        'app': './src/app.js'
    },
    // 出口文件
    output: {
        // 打包文件地址
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: '[name].[chunkhash].js'
    },
    // 配置loader  webpack4.0 改
    module: {
        rules: [
            // 配置 css-loader
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // loader: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                // 忽略node_modules文件
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // loader: ['style-loader', 'css-loader', 'sass-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                }),
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            }
        ]
    },
    // server 服务
    devServer: {
        port: 8848,
        open: false
    },
    // 插件
    plugins: [
        //
        new htmlWebpackPlugin({
            // 标题
            title: '学习 webpack',
            // 模板
            template: 'src/index.html',
            // 压缩 去掉所有空格
            minify: {
                collapseWhitespace: true //false | true
            },
            // 添加hash
            hash: true
        }),
        // css分离
        new ExtractTextPlugin('style.css'),
        // 删除文件 保留新文件
        new CleanWebpackPlugin(['dist']),
    ]
}