const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const WorkboxPlugin = require('workbox-webpack-plugin');

const prodConf = {
    mode: 'production',
    performance: false,
    // devtool: 'cheap-module-source-map',
    plugins: [
        // 基于service worker
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}

module.exports = webpackMerge(commonConf, prodConf);