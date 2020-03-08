const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'library.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'library', // 配置一个全局变量library(变量名可以随便取)，可以通过`script`标签的形式引入并使用
        libraryTarget: 'umd' // 通用模块定义，通过ES module、CommonJS或者AMD都可以使用
    },
    externals: ['lodash']
};