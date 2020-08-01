const babel = require('@babel/core');
const type = require('@babel/types');

const transformArrowFunction = {
    visitor: {
        // 当节点的type为VariableDeclaration时，就会执行该方法
        VariableDeclaration: (path, state) => {
            console.log(path.node);
        }
    }
};

const code = 'const a = 1';
const res = babel.transform(code, {
    plugins: [
        transformArrowFunction
    ]
});
console.log(res);