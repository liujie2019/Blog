// yarn add esprima estraverse escodegen -D
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const code = 'function ast() {}';
const ast = esprima.parse(code);
estraverse.traverse(ast, {
    enter(node) {
        console.log('enter', node.type);
        if (node.type === 'Identifier') {
            node.name += 'enter';
        }
    },
    leave(node) {
        console.log('leave', node.type);
        if (node.type === 'Identifier') {
            node.name += 'leave';
        }
    }
});
const res = escodegen.generate(ast);
// console.log(ast);
console.log(res);