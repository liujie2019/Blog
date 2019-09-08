const fs = require('fs');

function req(moduleName) {
    // content代表的是文件内容
    let content = fs.readFileSync(moduleName, 'utf8');
    let fn = new Function('exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports');
    let module = {
        exports: {}
    }
    return fn(module.exports, module, req, __dirname, __filename);
}
// let str = require('./a');
let str = req('./a.js');
console.log(str);
/*
// 创建了如下的函数
function(exports, module, require, __dirname, __filename) {
    module.exports = '欢迎欢迎';
    return module.exports;
}
*/