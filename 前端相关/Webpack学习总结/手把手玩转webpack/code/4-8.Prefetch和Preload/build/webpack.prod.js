const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');

const prodConf = {
    mode: 'production',
    devtool: 'cheap-module-source-map'
}

module.exports = webpackMerge(commonConf, prodConf);