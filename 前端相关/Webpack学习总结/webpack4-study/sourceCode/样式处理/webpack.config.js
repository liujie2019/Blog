const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: top
                        }
                    }
                ]
            }
        ]
    }
}