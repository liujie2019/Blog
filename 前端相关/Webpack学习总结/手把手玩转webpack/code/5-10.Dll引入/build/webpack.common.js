const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const plugins = [
    new HtmlWebpackPlugin({
        title: 'HtmlWebpackPlugin使用',
        filename: 'index.html',
        template: './src/index.html'
    }),
    new CleanWebpackPlugin()
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
        plugins.push(new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll', file)
        }));
    }
    if (/.*\.manifest.json/.test(file)) {
        // 在打包过程中进行分析，如果需要的模块在dll中有，则直接使用，不会再去node_modules中查找
        plugins.push(new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll', file)
        }));
    }
});
module.exports = {
    entry: './src/index.js', // 等价于如下配置
    // entry: {
    //     main: './src/index.js'
    // }
    output: {
        // publicPath: '/',
        // filename: 'bundle.js',
        filename: '[name].js',
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
    plugins: plugins,
    optimization: {
        splitChunks: {
            // chunks: 'all', // all表示同步和异步代码都进行代码分割
            // cacheGroups: {
            //     vendors: false,
            //     default: false
            // },
            chunks: 'all', // 默认是只对异步代码进行代码分割
            minSize: 30000, // 引入的模块大于30kb的时候才代码分割
            maxSize: 0, // 一般不用
            minChunks: 1, // 模块的最小引用次数
            maxAsyncRequests: 5, // 同时加载的文件数为5个
            maxInitialRequests: 3,
            automaticNameDelimiter: '~', // 文件名之间的连接符
            automaticNameMaxLength: 30, // 文件名最大的长度
            name: true, // 可以对生成的文件进行重命名，如在cacheGroups配置filename
            // cacheGroups: {
            //     vendors: false,
            //     default: false
            // }
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    // filename: 'vendors.js'
                },
                // default: false
                default: {
                    // minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'common.js'
                }
            }
        }
    }
};