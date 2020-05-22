const path = require('path');
const SyncPlugin = require('./plugins/SyncPlugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new SyncPlugin() // 同步插件
    ]
};