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
            // 数组形式
            // {
            //     test: /\.js$/,
            //     loader: ['my-loader3', 'my-loader2', 'my-loader']
            // }
            // 对象形式
            {
                test: /\.js$/,
                use: {
                    loader: 'my-loader'
                },
                enforce: 'pre' // 指定my-loader最先使用
            }, {
                test: /\.js$/,
                use: {
                    loader: 'my-loader2' // 默认为normal
                }
            }, {
                test: /\.js$/,
                use: {
                    loader: 'my-loader3'
                },
                enforce: 'post' // 最后使用
            }
        ]
    },
    resolveLoader: {
        // 给loader配置别名
        // alias: {
        //     'my-loader': path.resolve(__dirname, 'loaders', 'my-loader')
        // },
        // 默认去node_modules目录下找对应的loader，找不到了再去loaders目录下寻找
        // 推荐使用
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    }
};