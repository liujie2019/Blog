const path = require('path');
const SyncPlugin = require('./plugins/SyncPlugin');
const LogWebpackPlugin = require('./plugins/LogWebpackPlugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new SyncPlugin({name: 'lisi'}), // 同步插件
        new LogWebpackPlugin(() => {
            // Webpack 模块完成转换成功
            console.log('emit 事件发生啦，所有模块的转换和代码块对应的文件已经生成好~')
          } , () => {
            // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
            console.log('done 事件发生啦，成功构建完成~')
          })
    ]
};