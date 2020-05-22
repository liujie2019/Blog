const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: ['sync-loader']
                use: [{
                    loader: 'sync-loader'
                }, {
                    loader: 'async-loader',
                    options: {
                        name: 'lisi'
                    }
                }]
            }
        ]
    }
};