const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

module.exports = {
    // entry: './src/index.js',
    entry: {
        testA: './src/testA.js',
        testB: './src/testB.js'
    },
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: { // 缓存组，对不同的文件做不同处理
                common: {
                    name: 'vender', // 输出文件的名字
                    test: /\.js/,
                    chunks: 'initial'  // 只对入口文件处理
                }
            }
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'webpack ProvidePlugin demo',
        //     template: './src/template.html',
        //     filename: 'index.html'
        // }),
        new HtmlWebpackPlugin({
            title: 'testA demo',
            template: './src/template.html',
            filename: 'testA.html',
            env: 'production', // 设置自定义参数
            excludeChunks: ['testB']
        }),
        new HtmlWebpackPlugin({
            title: 'testB demo',
            template: './src/template.html',
            filename: 'testB.html',
            env: 'development',
            excludeChunks: ['testA']
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash'
        })
    ]
};