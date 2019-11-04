const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
// @babel/traverse默认是ES module导出，所以要加default
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 定义一个模块分析函数
const moduleAnalyser = filename => {
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = parser.parse(content, {
        sourceType: 'module'
    });
    // dependencies中保存的不能相对路径，需要转为绝对路径
    const dependencies = {}; // 定义一个依赖对象
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(filename);
            const newFile = './' + path.join(dirname, node.source.value);
            dependencies[node.source.value] = newFile;
        }
    });
    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });
    return {
        filename,
        dependencies,
        code
    }
    // console.log(code);
    // console.log(dependencies);
    // console.log(ast.program.body);
    // console.log(content);
}

const moduleInfo = moduleAnalyser('./src/index.js');
console.log(moduleInfo);