const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
            loader: 'babel-loader'
         }]
      }, {
        test: /\.s(a|c)ss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
   	  }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        filename: 'index.html', //生成的html文件名（相对路径：将生成到output.path指定的dist目录下）
        template: './src/index.html', //指定模板文件，不指定的话用默认的空模板
        title: 'webpack配置指南',
        minify: {
            removeComments: true //删除注释
        },
        hash: true
    })
  ],
  resolve:{
    extensions: ['.js', '.jsx', '.scss', '.css', '.json']
  }
}