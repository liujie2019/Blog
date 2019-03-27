const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web', // 项目主要跑在浏览器端
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024, // 对于小于1024的图片转成base64代码写在代码中，不单独生成图片文件，减少http请求
                            name: '[name].[ext]' //ext是文件的扩展名
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin()
    ]
}

if (isDev) { // 开发环境
    config.module.rules.push({
        test: /\.styl(us)?$/,
        use: [
            'vue-style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    });
    config.devtool = 'cheap-module-eval-source-map';
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true // 启动热加载
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
else {
    config.devtool = 'cheap-module-source-map';
    config.entry = {
        main: path.join(__dirname, 'src/index.js'),
        vendor: ['vue'] // 单独打包成一个文件
    };
    config.optimization = ({
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor'
                }
            }
        }
    });
    // 在生产环境使用chunkhash
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.styl(us)?$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    });
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css'
        }),
        new CleanWebpackPlugin(['./dist/*.*.js', './dist/*.*.css'], {
            root: __dirname, //根目录
            verbose: true, //开启在控制台输出信息
            dry: false //启用删除文件
        })
    );
}

module.exports = config;