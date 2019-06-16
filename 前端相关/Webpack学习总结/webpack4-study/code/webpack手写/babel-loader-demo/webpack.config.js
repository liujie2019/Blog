const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'my-babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    }
};