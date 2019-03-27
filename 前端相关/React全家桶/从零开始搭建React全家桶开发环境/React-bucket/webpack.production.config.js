const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js',
        publicPath: 'http://cdn.eaxmple.com/assets/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                              path: './postcss.config.js'  // 得在项目根目录创建此文件
                            }
                        }
                    }, 'sass-loader']
                }),
                include: path.resolve(__dirname, 'src'), //限制范围，提高打包速度
                exclude: /node_modules/ //排除打包目录
            }, {
                test: /\.html$/,
                use: {
                        loader: 'html-loader',
                        options: {
                            minimize: false //是否压缩html
                        }
                }
            }, {
                test:/\.(jpg|gif|jpeg|gif|png)$/,
	            use:[
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images/', // 图片会被打包在 dist/images 目录下
                            limit: 10240, //小于10kb进行base64转码引用
                            name: '[hash:8].[name].[ext]'//打包后图片的名称，在原图片名前加上8位hash值
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'webpack实战练习',
            template: './src/index.html'
        }),
        //每次打包都会先清除当前目录中dist目录下的文件
        new CleanWebpackPlugin('./dist/bundle.*.js'),
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ],
    //由于压缩后的代码不易于定位错误, 配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置
    devtool: 'eval-source-map',
    resolve: {
        //配置简写, 配置过后, 书写该文件路径的时候可以省略文件后缀。
        extensions: ['.js', '.jsx', '.coffee', '.css', '.scss']
    }
};