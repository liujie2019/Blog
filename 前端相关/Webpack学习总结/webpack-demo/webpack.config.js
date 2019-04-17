const path = require('path');
const os = require('os');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require('HappyPack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },
    mode: 'development', //不压缩
    entry: {
        'app': './src/index.js'
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
                use: ['HappyPack/loader?id=babel']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: 'css-loader',
                //     publicPath: '../'
                // })
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
        new HappyPack({
            // 用唯一的标识符id来代表当前的Happypack是用来处理一类特定的文件的
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html', //生成的html文件名（相对路径：将生成到output.path指定的dist目录下）
            template: './src/index.html', //指定模板文件，不指定的话用默认的空模板
            title: 'webpack配置指南',
            minify: {
                removeComments: true //删除注释
            },
            hash: true
        }),
        new ExtractTextPlugin({
            filename: 'style/style.css'
        })
    ],
    resolve:{
        extensions: ['.js', '.jsx', '.css', '.json'],
        //配置别名可以加快webpack查找模块的速度
        alias: {
            components: path.resolve(__dirname, 'src/components')
        }
    },
};