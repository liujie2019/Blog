const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },
    devtool: 'cheap-module-source-map',
    mode: 'development', //不压缩
    entry: {
        'app': [
            'webpack-dev-server/client?http://localhost:3000/',
            'webpack/hot/dev-server',
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
				test: /\.(png|jpe?g|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1024 * 10, // 10k以下的base64内联，不产生图片文件
						fallback: 'file-loader', // 10k以上，用file-loader抽离（非必须，默认就是file-loader）
						name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
						outputPath: 'images/', // 输出路径
						publicPath: '' // 可访问到图片的引用路径(相对/绝对)
					}
				}
			}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', //生成的html文件名（相对路径：将生成到output.path指定的dist目录下）
            template: './src/index.html', //指定模板文件，不指定的话用默认的空模板
            title: 'webpack配置指南',
            minify: {
                removeComments: true //删除注释
            },
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,//不跳转
        compress: true,
        overlay: true, // 浏览器页面上显示错误
        open: true, // 自动打开浏览器
        hot: true
    },
    resolve:{
        extensions: ['.js', '.jsx', '.css', '.json'],
        //配置别名可以加快webpack查找模块的速度
        alias: {
            components: path.resolve(__dirname, 'src/components')
        }
    },
};