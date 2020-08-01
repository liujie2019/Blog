const express = require('express');
const webpack = require('webpack');

// webpackDevMiddleware监听打包文件的变化，当文件发生变化时，触发complier重新进行代码打包
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
// 在node中使用webpack
const complier = webpack(config); // 这里complier是一个编译器，编译器执行一次就会打包一次代码
const app = express();

app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}));

app.listen(8093, () => {
    console.log('server is run 8088');
});

/*
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
*/