#!/usr/bin/env node //告诉node使用终端运行

const program = require('commander'); // 终端输入处理
const chalk = require('chalk');
const { select } = require('../lib/talk');
const package = require('../package.json'); //获取版本信息

console.log(chalk.green('Cli start'));
program.version(package.version, '-V, --version');

// 执行 node ./bin/cli.js init
program
    .command('init')
    .alias('i')
    .description('创建新的项目')
    .action(() => {
        select()
    });

// program.parse()解析命令行参数argv
program.parse(process.argv);