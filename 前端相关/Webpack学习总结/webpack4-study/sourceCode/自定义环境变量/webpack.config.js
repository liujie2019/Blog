const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
console.log(process.env.NODE_ENV, process.env.DEBUG); // production true
module.exports = {
    // mode: 'production',
    mode: 'development',
    // mode: 'none',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
        // publicPath: __dirname + '/dist/' // 设置基础路径
    },
    plugins: [
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new CleanWebpackPlugin(),
        // 设置默认值的对象，如果在process.env中对应的环境变量不存在时将使用指定的默认值
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV,
            DEBUG: process.env.DEBUG
        }),
        new webpack.BannerPlugin({
            banner: 'edit by liujie'
        }),
        new CopyPlugin([ // 复制静态资源到指定目录
            { from: 'src/assets/', to: 'dist/assets/' }
        ]),
        // new webpack.DefinePlugin({
        //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        //     DEBUG: JSON.stringify(process.env.DEBUG)
        // })
    ]
};