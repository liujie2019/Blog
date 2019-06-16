#! /usr/bin/env node

// console.log('hello my-webpack 1111');
// 第一步：需要找到当前执行命令的路径，拿到weboack.config.js

const path = require('path');

// config配置文件
const config = require(path.resolve('webpack.config.js'));

const Compiler = require('../lib/Compiler');
const compiler = new Compiler(config);
compiler.hooks.entryOption.call();
// 标识运行编译
compiler.run();