const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js', // 等价于如下配置
    // entry: {
    //     main: './src/index.js'
    // }
    output: {
        publicPath: '/',
        // filename: 'bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                // less-loader会将less语法转化为css语法
                // css-loader会分析多个css文件之间的关系(@import语法等)，把多个css文件合并成一段css代码
                // style-loader将合并后的css插入到html文件的style标签中
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // modules: true // 开启css模块化打包
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff2?)$/,
                use: 'file-loader'
            },
            {
                test: /\.(jpg|txt|png|gif)$/,
                use: [{
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options: {
                        // [name]是源文件名称
                        // [ext]是源文件后缀
                        name: '[name].[hash].[ext]', // 配置打包后的文件名称
                        limit: 8192, // 图片大于4kb，会打包生成图片，小于的话会进行base64编码
                        outputPath: 'images/' // 指定打包后文件放到dist目录下的images目录下
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HtmlWebpackPlugin使用',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnly: true // 即使hmr的功能没有生效，也不刷新浏览器
    }
};