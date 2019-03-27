// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	//devtool用来生成Source Maps
	devtool: 'eval-source-map',
	//__dirname是node.js中的一个全局变量，表示当前文件所在目录
	entry: __dirname + '/src/index.js',//唯一的入口文件
	output: {
		path: __dirname + '/dist',//打包后的文件存放的地方
		// publicPath: '/dist/',
		filename: 'bundle.js'//打包后输出文件的文件名
	},
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			use: {
				loader: 'babel-loader',
				options: {
                      presets: [
                          "es2015", "react"
                      ]
                    }
			},
			exclude: /node_modules/
		},{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({//分离CSS和JS文件
				fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, {
                    loader: "postcss-loader"
                }]
			})
		}]
	},
	devServer: {
		//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
		contentBase: './',//本地服务器所加载的页面所在的目录
		historyApiFallback:true,//不跳转
      	inline:true,//实时刷新
      	hot:true
	},
	plugins: [
		new webpack.BannerPlugin('版权所有,翻版必究'),
		new HtmlWebpackPlugin({
			template: __dirname + '/src/index.tmpl.html'
		}),
		new webpack.HotModuleReplacementPlugin()//热加载插件
	],
	resolve: {
		extensions: ['.js','.json','.jsx']
	}
};