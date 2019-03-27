var path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    // mode: "development",
    // mode: 'none',
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: __dirname + '/dist/' // 设置基础路径
    },
    plugins: [
        // 参数是一个数组，数组中是需要删除的目录名
        new CleanWebpackPlugin([
            './dist'
        ])
    ]
};