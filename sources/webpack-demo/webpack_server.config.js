const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/main_server.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs2',
        filename: 'bundle_server.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['ignore-loader']
            }
        ]
    },
    devtool: 'source-map',
    resolve:{
        extensions: ['.js', '.jsx', '.css', '.json']
    }
};