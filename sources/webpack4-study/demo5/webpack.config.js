const path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        app: './src/index.js'
    },
    output: {
        publicPath: __dirname + '/dist/', // js引用路径或者CDN地址
        path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 30, // 30kb以下的文件采用url-loader
                        // 否则采用file-loader，默认值是file-loader
                        fallbacck: 'file-loader'
                    }
                }
            }
        ]
    }
};