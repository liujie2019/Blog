const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js', // 等价于如下配置
    // entry: {
    //     main: './src/index.js'
    // }
    output: {
        filename: devMode ? '[name].[contenthash].js' : '[name].js',
        chunkFilename: devMode ? '[name].[contenthash].js' : '[name].js',
        path: path.resolve(__dirname, '../dist')
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: !devMode // 开发环境下开启模块热替换
                        },
                    },
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
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].[hash].css' : '[name].css',
            chunkFilename: devMode ? '[id].[hash].css' : '[id].css',
        })
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime' // 将webpack运行过程中的运行时代码单独放到runtime.js文件中
        },
        minimizer: [new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            chunks: 'all'
        }
    }
};