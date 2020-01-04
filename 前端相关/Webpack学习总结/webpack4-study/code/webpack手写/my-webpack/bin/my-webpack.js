#! /usr/bin/env node

// console.log('hello my-webpack 1111');
// 第一步：需要找到当前执行命令的路径，拿到weboack.config.js
const path = require('path');
// config配置文件
const config = require(path.resolve('webpack.config.js'));

// 编译类Compiler
const Compiler = require('../lib/Compiler');
// 基于webpack配置进行编译
const compiler = new Compiler(config);

// 触发入口钩子的监听函数
// hooks是Compiler实例的私有属性
compiler.hooks.entryOption.call();
// 标识运行编译
compiler.run();