const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // mode: 'production',
    // entry: [
    //     'webpack-dev-server/client?http://localhost:9000/',
    //     'webpack/hot/dev-server',
    //     './src/index.js'
    // ],
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
        // publicPath: '/assets/'
    },
    // devtool: 'source-map',
    devtool: 'cheap-source-map',
    // devtool: 'eval-source-map',
    // devtool: 'inline-source-map',
    // devtool: 'hidden-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        // 该插件的作用是实现模块热替换，实际上若启动时带上--hot参数，就会注入该插件，生成.hot-update.json文件
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    // 只有在开启监听模式时，watchOptions才有意义
    // 默认为false，也就是不开启
    // watch: true,
    // // 监听模式运行时的参数
    // // 在开启监听模式时才有意义
    // watchOptions: {
    //     // 不监听的文件或文件夹，支持正则匹配
    //     // 默认为空
    //     ignored: /node_modules/,
    //     // 监听到变化发生后等300ms再去执行动作，截流
    //     // 防止文件更新太快而导致重新编译频率太快。默认为300ms
    //     aggregateTimeout: 300,
    //     // 判断文件是否发生变化是通过不停地询问系统指定文件有没有变化实现的
    //     // 默认每秒询问1000次
    //     poll: 1000
    // }
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        inline: true,
        port: 9000,
        host: '0.0.0.0',
        disableHostCheck: false,
        open: true,
        overlay: true,
        noInfo: true,
        hot: true
    }
}