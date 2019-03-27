const webpack = require('webpack');

module.exports = {
	entry: __dirname + '/src/index.jsx',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: './',
		historyApiFallback: true,
		inline: true,//实时刷新
	},
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react']
				}
			},
			exclude: /node_modules/
		}]
	}
};