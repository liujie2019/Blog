const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const spritesConfig = {
    spritePath: './dist/assets/images/',
    retina: true // 处理两倍图片的大小
};

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: {
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options: {
                        limit: 1 * 1024, // 图片小于100k时采用base64编码
                        name: '[name]-[hash:6].min.[ext]',
                        outputPath: 'assets/images/', // 设置静态资源打包后存放的目录
                        // publicPath一般为静态资源的CDN存放地址或者服务器上静态资源的存放地址
                        publicPath: 'www.baidu.com/assets/images/'
                    }
                }
            }, {
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
                // use: ['style-loader', 'css-loader']
            }, {
                test: /\.html/,
                use: ['html-withimg-loader']
            }
        ]
    },
    // devServer基于HtmlWebpackPlugin在内存中生成了相应的html文件
    devServer: {
        port: 3000,
        progress: true, // 显示打包进度条
        contentBase: './dist', // 指定服务地址
        open: true, // 自动打开浏览器
        compress: true // 压缩
    },
    plugins: [
        new HtmlWebpackPlugin({
           filename: 'index.html',
           template: './src/index.html',
           title: '自动生成html',
           inject: 'body',
           minify: {
             removeAttributeQuotes: true, // 移除属性的双引号
            //  collapseWhitespace: true // 折叠空行变成一行
           },
           hash: true // 给插入到模板中的静态资源文件后面加一个hash值
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}