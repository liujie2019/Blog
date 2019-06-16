const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const spritesConfig = {
    spritePath: './dist/static'
};
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
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [require('postcss-sprites')(spritesConfig)]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    // loader: 'file-loader',
                    // options: {
                    //     name: '[name]-[hash:6].min.[ext]'
                    // }
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]',
                        limit: 1024 * 30, // 30kb以下的文件采用url-loader
                        publicPath: 'static/',
                        outputPath: 'static/',
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
        }),
        new ImageminPlugin({
            // disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                quality: '80'
            }
        })
    ]
};