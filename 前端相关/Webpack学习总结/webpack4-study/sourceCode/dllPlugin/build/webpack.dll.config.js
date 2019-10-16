const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js', // 生成的文件名
        path: path.resolve(__dirname, '../dist'),
        library: '_dll_[name]', // 给输出的结果加个名字，这里叫_dll_react
        libraryTarget: 'var' // 配置如何暴露library，默认为var
        // commonjs 结果放在export属性上，umd统一资源模块, 默认是var
    },
    plugins: [
       new CleanWebpackPlugin(),
       new webpack.DllPlugin({
           // 这里的name要和output中的library名称一致
           name: '_dll_[name]', // name === library
           path: path.resolve(__dirname, '../dist', '[name].manifest.json') // manifest.json 定义了各个模块的路径
       })
    ]
}