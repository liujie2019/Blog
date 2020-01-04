const babel = require('@babel/core');
const type = require('@babel/types');

const transformArrowFunction = {
    visitor: {
        // 将const和let转换为var
        // 每个节点都有一个type字段，type值为VariableDeclaration会被匹配成功
        VariableDeclaration: (path, state) => {
            const {node} = path;
            if (node.kind === 'const' || node.kind === 'let') {
                // node.kind = 'var'; // 方式1：直接替换
                // 方式2：采用replaceWith
                const variableDeclaration = type.VariableDeclaration('var', path.node.declarations)
                // replaceWith为替换节点的方法
                path.replaceWith(variableDeclaration);
            }
        },
        // Visitor中的每个函数接收2个参数：path和state
        // path是表示两个节点之间连接的对象
        ArrowFunctionExpression: (path, state) => {
            // node就是ArrowFunctionExpression匹配到的当前节点
            // parent是当前节点的父节点
            const {node, parent} = path;
            const id = parent.id;
            const params = node.params; // 获取参数
            // 将BinaryExpression转换为BlockStatement
            const body = type.blockStatement([
                type.returnStatement(node.body)
            ]);
            // 生成对应的functionExpression
            const functionExpression = type.functionExpression(id, params, body, false, false);
            // 节点替换，将匹配到的ArrowFunctionExpression替换为新生成的FunctionExpression
            path.replaceWith(functionExpression);
        }
    }
};

const code = 'const fn = (a, b) => a + b';
const result = babel.transform(code, {
    plugins: [
        transformArrowFunction
    ]
});

console.log(result.code);