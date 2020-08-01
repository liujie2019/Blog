const path = require('path');

module.exports = {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    entry: './src/index2.js', // 等价于如下配置
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
            }
        ]
    }
};