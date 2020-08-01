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
    // 将源代码编译成浏览器可以识别的代码
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
// 定义一个生成项目依赖图谱的函数
const makeDependenciesGraph = entry => {
    const entryModule = moduleAnalyser(entry);
    const graphArray = [entryModule];
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const {dependencies} = item; // 拿到当前模块的依赖对象
        if (dependencies) { // 如果依赖对象存在，对依赖对象进行遍历
            for (let key in dependencies) {
                // 递归
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
// 生成代码
const generateCode = entry => {
    // 先将依赖图谱对象转为字符串
    const graph = JSON.stringify(makeDependenciesGraph('./src/index.js'));
    // 将代码放到闭包里执行，避免污染全局环境
    return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath]);
                }
                var exports = {};
                (function (require, exports, code) {
                    eval(code)
                })(localRequire, exports, graph[module].code)
                return exports;
            }
            require('${entry}')
        })(${graph});
    `;
};
// localRequire是将模块在文件中引用的路径转为模块真实的存放路径
const code = generateCode('./src/index.js');
console.log(code);
// 将编译好的代码写入文件
fs.writeFileSync('./dist/bundle.js', code, 'utf-8');