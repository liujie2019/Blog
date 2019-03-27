const path = require('path');
const MyWebpackPlugin = require('./plugins/my-webpack-plugin');

module.exports = {
    entry: {
      main: './src/index.js'
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve('./dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'my-webpack-loader',
                options: {
                    test: 'wangwu'
                }
            }
          }
        ]
    },
    plugins: [
        new MyWebpackPlugin('我是自定义的插件')
    ],
    optimization: {
        runtimeChunk: { name: 'common/runtime' },
        splitChunks: {
            cacheGroups: {
                vendor: { // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'common/vendor', // 打包后的文件名，任意命名
                    priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                utils: { // 抽离自定义公共代码
                    test: /\.js$/,
                    chunks: 'initial',
                    name: 'common/utils',
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    resolveLoader: {
        modules: ['node_modules', './loaders/']
    }
}