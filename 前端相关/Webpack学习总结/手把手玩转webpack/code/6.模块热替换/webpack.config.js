const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

  module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      hotOnly: true,
      open: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          title: '模块热替换'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
