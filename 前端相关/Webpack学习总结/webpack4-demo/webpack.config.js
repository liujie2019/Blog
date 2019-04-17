const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件
    entry: path.resolve(__dirname, 'src/index.jsx'),
    // 输出到dist文件夹，输出文件名称为bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // 排除不处理的目录
                include: path.resolve(__dirname, 'src'), // 精确指定要处理的目录
                use: 'babel-loader?cacheDirectory' // 缓存loader执行结果 发现打包速度已经明显提升了
            }, {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            }, {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }]
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.(jpg|gif|jpeg|gif|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images/', // 图片会被打包在 dist/images 目录下
                            limit: 1024 * 10, /* 小于10kb进行base64转码引用 */
                            name: '[hash:8].[name].[ext]' // 打包后图片的名称，在原图片名前加上8位hash值
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        compress: true,
        port: 8080,
        hot: true // 热加载
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热加载插件
        new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery'
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('1.0.0')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'webpack实战练习',
            template: path.join(__dirname, 'src/index.html')
        })
    ],
    // 由于压缩后的代码不易于定位错误, 配置该项后发生错误时即可采用source-map的形式直接显示你出错代码的位置
    devtool: 'eval-source-map',
    resolve: {
        // 配置简写, 配置过后, 书写该文件路径的时候可以省略文件后缀。
        extensions: ['.js', '.jsx', '.coffee', '.css', './scss']
    }
};