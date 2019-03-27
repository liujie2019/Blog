const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			exclude: /node_modules/,
			use: [
                {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
                }
            }]
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        }
    ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: './index.tpl.html',
        })
    ],
    resolve: {  
        extensions: ['.js', '.jsx', '.coffee', '.css', './scss']  
    }
}