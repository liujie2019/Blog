const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
// @babel/traverse默认是ES module导出，所以要加default
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 定义一个模块分析函数
const moduleAnalyser = filename => {
    const content = fs.readFileSync(filename, 'utf-8'); // 同步读取文件内容
    const ast = parser.parse(content, {
        sourceType: 'module'
    });
    // dependencies中保存的不能相对路径，需要转为绝对路径
    const dependencies = {}; // 定义一个依赖对象
    // 遍历ast，拿到需要节点
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(filename); // 获取到node执行文件的所在目录文件夹
            const newFile = './' + path.join(dirname, node.source.value);
            // dependencies对象的key是依赖模块的路径，value是依赖模块的真实路径
            dependencies[node.source.value] = newFile;
        }
    });
    // transformFromAst将ast转换成浏览器可以执行的代码
    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });
    return {
        filename,
        dependencies,
        code
    };
    // console.log(code);
    // console.log(dependencies);
    // console.log(ast.program.body);
    // console.log(content);
}

const moduleInfo = moduleAnalyser('./src/index.js');
console.log(moduleInfo);