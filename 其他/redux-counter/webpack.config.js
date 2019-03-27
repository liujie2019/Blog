module.exports = {
    entry: './src/index.jsx', // 入口文件路径
    output: {
        filename: './dist/build.jsx'
    },
    devServer: {
        inline: true,//设置为true,源文件发生改变自动刷新页面
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest']
                }
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    }
}