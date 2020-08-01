const parser = require('@babel/parser');
const type = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const code = 'function fn(a) {}';
// 解析代码转为ast
const ast = parser.parse(code);
const myVisitor = {
    FunctionDeclaration(path) {
        // path.node.id.name = 'test';
        // 替换id
        path.node.id = type.identifier('test');
        // console.log(path.node.params);
        // 追加函数参数
        // path.node.params.push(type.identifier('b'), type.identifier('c'));
        // 更改函数参数
        path.node.params = [type.identifier('b'), type.identifier('c')];
    }
};

traverse(ast, myVisitor);
const res = generator(ast);
// console.log(res);
console.log(res.code);
