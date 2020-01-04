const babel = require('@babel/core');
const type = require('@babel/types');
const code = 'const num = 2 * 3 * 4 * 5';

const preCalculatePlugin = {
    visitor: {
        BinaryExpression: (path, state) => {
            const node = path.node;
            const {left, right, operator} = node;
            if (!isNaN(left.value) && !isNaN(right.value)) {
                let result = eval(left.value + operator + right.value);
                result = type.numericLiteral(result);
                path.replaceWith(result);
                console.log(path.parentPath.node);
                if (path.parentPath.node.type === 'BinaryExpression') {
                    preCalculatePlugin.visitor.BinaryExpression.call(null, path.parentPath);
                }
            }
        }
    }
}

const res = babel.transform(code, {
    plugins: [preCalculatePlugin]
});

console.log(res.code); // const num = 120;