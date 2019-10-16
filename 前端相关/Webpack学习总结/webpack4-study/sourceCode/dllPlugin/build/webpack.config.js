const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        // libraryTarget: 'amd'
        // umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
           filename: 'index.html',
           template: './src/index.html',
           title: '自动生成html',
           inject: true // 默认为true，插入到body标签底部
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['_dll_react.js'],
            append: false
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dist', 'react.manifest.json'),
            sourceType: 'amd'
        })
    ]
}