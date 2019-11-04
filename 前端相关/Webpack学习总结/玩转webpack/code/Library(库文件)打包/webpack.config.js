const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'library.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'library',
        libraryTarget: 'umd'
    },
    externals: ['lodash']
};