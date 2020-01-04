const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');

const devConf = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        // hotOnly: true // 即使hmr的功能没有生效，也不刷新浏览器
    },
    optimization: {
        usedExports: true
    }
}

module.exports = webpackMerge(commonConf, devConf);