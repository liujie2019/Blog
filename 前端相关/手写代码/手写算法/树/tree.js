// 网易
const tree = {
    name: 'root',
    children: [
        {
            name: 'c1',
            children: [
                {
                    name: 'c11',
                    children: []
                }, {
                    name: 'c12',
                    children: []
                }
            ]
        },
        {
            name: 'c2',
            children: [
                {
                        name: 'c21',
                    children: []
                    },
                    {
                        name: 'c22',
                    children: []
                }
            ]
        }
    ]
}

// 基于栈实现
function traverse(tree) {
    let stack = [tree];
    let res = [];
    while(stack.length) {
        const {name, children} = stack.pop();
        res.push(name);
        if (children && children.length) {
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }
    }
    return res;
}

console.log(traverse(tree));

// 深度优先的方式遍历 打印 name
// ['root', 'c1','c11', 'c12', 'c2', 'c21', 'c22']
