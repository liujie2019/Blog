var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js', //设置按需加载后的chunk名字,
        publicPath: '/dist/' // 设置基础路径
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          }
        ]
    },
    devServer: {
        contentBase: './',
        compress: true,
        port: 8088,
        hot: true // 开启热更新
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 参数是一个数组，数组中是需要删除的目录名
        new CleanWebpackPlugin([
            './dist'
        ])
    ]
};