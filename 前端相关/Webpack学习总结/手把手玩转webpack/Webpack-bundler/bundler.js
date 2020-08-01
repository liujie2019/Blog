const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');


const moduleAnalyser = filename => {
    // 同步读取文件内容
    const content = fs.readFileSync(filename, 'utf-8');
    // console.log(content);
    // 读取到的文件流 buffer 转换为浏览器可以识别的代码（AST）
    const ast = parser.parse(content, {
        sourceType: 'module' // 指定源码类型
    });
    // console.log(ast.program.body);
    const dependencies = {};
    // 遍历抽象语法树
    traverse(ast, {
        ImportDeclaration({node}) { // 访问者模式
            // console.log(node);
            const dirname = path.dirname(filename); // ./src
            // console.log(dirname);
            const newFile = './' + path.join(dirname, node.source.value);
            dependencies[node.source.value] = newFile;
        }
    });
    // 通过 AST 将 ES6 代码转换成 ES5 代码
    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });
    return {
        filename,
        dependencies,
        code
    };
};

// 定义一个生成项目依赖图谱的函数
const makeDependenciesGraph = entry => {
    const entryModule = moduleAnalyser(entry);
    // console.log(entryModule);
    const graphArray = [entryModule];
    for (let module of graphArray) {
        const {dependencies} = module;
        if (dependencies) {
            for (let key in dependencies) {
                // 递归
                graphArray.push(moduleAnalyser(dependencies[key]));
            }
        }
    }
    // console.log(graphArray);
    // 对依赖图谱graphArray进行数据格式转换，由数组变为对象
    const graph = {};
    graphArray.forEach(({filename, dependencies, code}) => {
        graph[filename] = {
            dependencies,
            code
        };
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
console.log(eval(code));