const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index2.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].chunk.js'
    }
};