const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js', // 等价于如下配置
    // entry: {
    //     main: './src/index.js'
    // }
    output: {
        publicPath: '/',
        // filename: 'bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HtmlWebpackPlugin使用',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnly: true // 即使hmr的功能没有生效，也不刷新浏览器
    }
};