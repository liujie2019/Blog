const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, 'src/index.jsx')//__dirname是node.js中的一个全局变量，指向当前执行脚本所在的目录
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist/assets'),
		filename: 'bundle.[hash].jsx'
	},
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			exclude: /node_modules/,
			use: ['react-hot-loader/webpack', {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
			}]
		}]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有,翻版必究'),
		new webpack.HotModuleReplacementPlugin(),//热加载插件
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
            template: './index.tmpl.html' 
        }),
        new webpack.optimize.UglifyJsPlugin(),//压缩JS代码
        //清除dist文件夹中重复的文件
        new CleanWebpackPlugin(
        	'dist/assets/bundle.*.jsx', //匹配删除的文件
        	{
		      root: __dirname,//项目根目录
		      verbose: true,//开启在控制台输出信息
		      dry: false//启用删除文件
		})
	],
	devServer: {
		contentBase: './', //本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true,//实时刷新
		hot: true
	},
	//由于压缩后的代码不易于定位错误, 配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置  
    devtool: 'eval-source-map', 
    resolve: {  
        //配置简写, 配置过后, 书写该文件路径的时候可以省略文件后缀。  
        extensions: ['.js', '.jsx', '.coffee', '.css', './scss']  
    }  
};