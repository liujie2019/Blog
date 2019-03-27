const path = require('path');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.san$/,
                use: 'san-loader'
            }, {
                test: /\.js$/,
                exclude: /(node_modules | dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.san', '.js', '.jsx', '.es6']
    }
}