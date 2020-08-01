const parser = require('@babel/parser');
const type = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const code = 'a === b';

const ast = parser.parse(code);

traverse(ast, {
    BinaryExpression: {
        enter(path) {
            if (path.node.operator !== '===') {
                return;
            }
            path.node.left = type.identifier('sebmck');
            path.node.right = type.identifier('dork');
        }
    }
});
const res = generator(ast);
console.log(res);
console.log(res.code);