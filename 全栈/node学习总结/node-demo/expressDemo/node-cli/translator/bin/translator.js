#! /usr/bin/env node
// 引入需要的模块
const program = require('commander');
const Table = require('cli-table2'); // 表格输出
const superagent = require('superagent'); // http请求
// 初始化commander
program
    .allowUnknownOption()
    .version('0.0.1')
    .usage('translator <cmd> [input]');

// 有道api
const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1';

// 添加自定义命令
program
    .command('query')
    .description('翻译输入')
    .action((word) => {
        // 发起请求
        superagent.get(API)
        .query({ q: word})
        .end((err, res) => {
            if(err){
                console.log('excuse me, try again');
                return false;
            }
            const data = JSON.parse(res.text);
            const result = {};

            // 返回的数据处理
            if(data.basic) {
                result[word] = data['basic']['explains'];
            }
            else if(data.translation) {
                result[word] = data['translation'];
            }
            else {
                console.error('error');
            }

            // 输出表格
            const table = new Table();
            table.push(result);
            console.log(table.toString());
        })
    })

// 没有参数时显示帮助信息
if (!process.argv[2]) {
    program.help();
    console.log();
}

program.parse(process.argv);