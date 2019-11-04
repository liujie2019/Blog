const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['async-loader']
            }
        ]
    }
};