const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: __dirname + '/dist/'
    },
    module: {
        rules: [
            {
                test: /.svg$/,
                // use: 'file-loader'
                use: 'raw-loader'
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};