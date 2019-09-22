// 预计算插件

const code = 'const result = 1000 * 60 * 60 * 24';
const babel = require('@babel/core'); // 核心模块
const types = require('@babel/types'); // 类型模块
// 预计算
let visitor = {
    BinaryExpression(path) {
        // console.log(path);
        let node = path.node;
        if(!isNaN(node.left.value)&&!isNaN(node.right.value)) {
            let result = eval(node.left.value + node.operator + node.right.value);
            result =  types.numericLiteral(result);
            path.replaceWith(result);
            //如果此表达式的父亲也是一个表达式的话,需要递归计算
            if(path.parentPath.node.type === 'BinaryExpression'){
                visitor.BinaryExpression.call(null,path.parentPath);
            }
        }
    }
}
let res = babel.transform(code, {
    plugins:[
        {visitor}
    ]
});
console.log(res.code); // const result = 86400000;