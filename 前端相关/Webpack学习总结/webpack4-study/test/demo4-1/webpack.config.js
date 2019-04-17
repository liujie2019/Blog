const path = require('path');

module.exports = {
    mode: 'none',
    // 多页面应用
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // priority属性设置打包优先级
                common: {
                    name: 'common', // 代码块的名称
                    chunks: 'all',
                    minChunks: 1,
                    priority: 0
                },
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                }
            }
        }
    }
};