const fs = require('fs');

// 自己实现的commonjs的require方法
function req(moduleName) {
    // content代表的是文件内容
    const content = fs.readFileSync(moduleName, 'utf8');
    // 最后一个参数是函数的内容体
    // 每个文件都是默认导出module.exports
    const fn = new Function('exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports');
    const module = {
        exports: {}
    };
    return fn(module.exports, module, req, __dirname, __filename);
}
// let str = require('./a');
const str = req('./a.js');
console.log(str);
/*
// 相当于创建了如下函数：
function(exports, module, require, __dirname, __filename) {
    module.exports = '欢迎欢迎';
    return module.exports;
}
*/