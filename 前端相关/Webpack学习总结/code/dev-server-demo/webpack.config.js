const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        // publicPath: '/assets/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        host: '0.0.0.0',
        disableHostCheck: false,
        open: true,
        overlay: true,
        noInfo: true
    }
}