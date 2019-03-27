const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer: {
        contentBase: './',
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        compress: true,
        port: 8088,
        hot: true // 热加载
        // proxy: {
        //     '/api': {
        //         // 转发到mockup的服务上了 具体见mockup/server
        //         target: 'http://localhost:9001',
        //         pathRewrite: {'^/api': ''}
        //     }
        // },
        // watchOptions: {
        //     // poll: config.dev.poll
        // }
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': require('./dev.env')
        // }),
        new HtmlWebpackPlugin({
            title: 'SAN APP',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
        // new webpack.NoEmitOnErrorsPlugin(),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: config.dev.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ])
    ]
});