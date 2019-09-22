const escodegen = require('escodegen');
const estraverse = require('estraverse');
const esprima = require('esprima');

let code = 'function ast(){}';
// 通过 esprima 把源码转化为AST
let ast = esprima.parse(code);
// 通过 estraverse 遍历并更新AST
estraverse.traverse(ast, {
    enter: function(node) {
        node.name += '-test';
    }
});
// 通过 escodegen 将AST重新生成源码
const new_ast = escodegen.generate(ast);
console.log(new_ast); // function ast-test() {}
