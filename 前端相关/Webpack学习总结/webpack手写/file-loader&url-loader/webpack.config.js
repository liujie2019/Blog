const path = require('path');

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
                test: /\.js$/,
                use: 'babel-loader'
            }, {
                test: /\.(ico|gif|png|jpg|jpeg|webp)$/i,
                use: {
                    loader: 'my-file-loader',
                    options: {
                        output: '/assets'
                    }
                }
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 100 * 1024 // 小于100k的图片采用base64编码
                //     }
                // }
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    }
};