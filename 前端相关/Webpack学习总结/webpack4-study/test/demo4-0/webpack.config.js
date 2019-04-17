const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/index2.js',
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    }
};