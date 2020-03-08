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
    };
    // console.log(code);
    // console.log(dependencies);
    // console.log(ast.program.body);
    // console.log(content);
}
// 定义一个生成项目依赖图谱的函数
const makeDependenciesGraph = entry => {
    const entryModule = moduleAnalyser(entry); // 获取入口文件依赖信息
    const graphArray = [entryModule];
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const {dependencies} = item; // 拿到当前模块的依赖对象
        if (dependencies) { // 如果依赖对象存在，对依赖对象进行遍历
            for (let key in dependencies) {
                graphArray.push(moduleAnalyser(dependencies[key]));
            }
        }
    }
    // 对依赖图谱graphArray进行数据格式转换，由数组变为对象
    const graph = {};
    graphArray.forEach(({filename, dependencies, code}) => {
        graph[filename] = {
            dependencies,
            code
        }
    });
    return graph;
};
const graphInfo = makeDependenciesGraph('./src/index.js');
console.log(graphInfo);