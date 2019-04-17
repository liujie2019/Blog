const path = require('path');

module.exports = {
    mode: 'none',
    entry:  './src/index.js',
    output: {
        publicPath: __dirname + '/dist/', // js引用路径或者CDN地址
        path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            transform: './src/transform.js'
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            }
        ]
    }
};