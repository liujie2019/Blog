#!/usr/bin/env node   //告诉node使用终端运行
const fs = require('fs'); //文件系统
const program = require('commander'); //终端输入处理框架
const package = require('./package.json'); //获取版本信息
program.version(package.version, '-v,--version')
       .command('init <name>')
       .action(name=>{
           console.log(name)
       })
  program.parse(process.argv);