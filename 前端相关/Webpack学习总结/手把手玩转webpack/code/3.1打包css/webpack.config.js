const path = require('path');

module.exports = {
    // entry: './src/index.js', 等价于如下配置
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // css-loader会分析多个css文件之间的关系(@import语法等)，把多个css文件合并成一段css代码
                // style-loader将合并后的css插入到html文件的style标签中
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true // 开启css模块化打包
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
                test: /\.(jpg|png|gif)$/,
                use: [{
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
    }
};