const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssEctractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: './src/index.js',
        util: './src/util.js',
    },
    output: {
        filename: '[name].min.js', // 输出 index.js 和 utils.js
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssEctractPlugin.loader, // 创建一个 link 标签
                    'css-loader', // css-loader 负责解析 CSS 代码, 处理 CSS 中的依赖
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpackPrefetch、webpackPreload 和 webpackChunkName的区别',
            template: './src/index.html'
        }),
        new MiniCssEctractPlugin({
            filename: 'index.bundle.css' // 输出的 css 文件名为 index.css
        }),
    ]
}