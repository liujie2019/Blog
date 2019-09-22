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
                test: /\.js$/,
                // use: [path.resolve(__dirname, 'loaders', 'my-loader')]
                loader: 'my-loader' // 如何找到自定义的my-loader
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