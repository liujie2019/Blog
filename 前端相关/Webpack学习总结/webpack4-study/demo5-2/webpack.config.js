const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'none',
    entry: {
        app: './src/index.js'
    },
    output: {
        publicPath: __dirname + '/dist/', // 静态资源引用路径或者CDN地址
        path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]',
                        limit: 1024 * 5, // 5kb以下的文件采用url-loader
                        publicPath: 'fonts/',
                        outputPath: 'fonts/',
                        // 否则采用file-loader，默认值是file-loader
                        fallback: 'file-loader'
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};