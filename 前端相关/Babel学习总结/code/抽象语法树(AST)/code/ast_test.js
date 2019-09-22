const babel = require('babel-core');

//babel插件
let MyVisitor = function({types: t}) {
    return {
        visitor: {
            AssignmentExpression(path) {
                if(path.node.operator !== '=') {
                    return;
                }
                //改变当前节点的left和right
                path.node.left = t.identifier('new-name');
                path.node.right = t.identifier('new-lisi');
            }
        }
    };
}

const code = 'name = lisi';
let demo = babel.transform(code, {
    //使用插件
    plugins: [MyVisitor]
});

console.log(demo); //new-name = new-lisi;