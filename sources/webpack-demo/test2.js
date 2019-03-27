const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件html-webpack-plugin
// const ExtractTextPlugin = require('extract-text-webpack-plugin');//引入插件extract-text-webpack-plugin
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");//引入插件mini-css-extract-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除文件插件

module.exports = {
  entry: {
    'app.bundle':'./src'
  },//输入文件路径 entry 的默认值是 ./src
  output: {
    path: __dirname + '/dist', //output.path 的默认值是 ./dist　path:对应一个绝对路径，此路径是希望一次性打包的目录
    //修改为hash模式
    filename: '[name].[chunkhash].js'//能指定出口文件中同样的filename名称　filename:编译文件的文件名，首选推荐：main.js||bundle.js||index.js
  },
  devServer: {
    port: 9000,
    open: true
  },

  // 由于plugin可以携带参数/选项，必须在wepback配置中，向plugins属性传入new实例
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',//根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析
      filename: 'index.html',// 默认情况下生成的 html 文件叫 index.html
      minify: {
        collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
      },
      hash: true, //为了更好的 cache，可以在文件名后加个 hash。
    }),
    // new ExtractTextPlugin('style.css') //实例ExtractTextPlugin，4.0弃用
    // new MiniCssExtractPlugin({//实例MiniCssExtractPlugin
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: "style.css",
    //   chunkFilename: "app.scss"
    // })
    new CleanWebpackPlugin(['dist']),//实例化，参数为目录
  ],
  module: {
    rules: [
      {
        test: /\.scss$/, //正则验证格式

        use: [ 'style-loader', 'css-loader', 'sass-loader' ] //安装的loader

        // ExtractTextPlugin 4.0弃用
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   //resolve-url-loader may be chained before sass-loader if necessary
        //   use: ['css-loader', 'sass-loader']
        // })

        // MiniCssExtractPlugin
        // use: [
        //   // MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   'sass-loader'
        // ]
      }
    ]
  },
};