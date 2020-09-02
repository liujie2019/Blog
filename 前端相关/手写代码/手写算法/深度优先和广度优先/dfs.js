const data = [{
    label: 'parent',
    children: [
        {
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
        }
    ]
}];

// 递归实现
// function dfs(arr, res = []) {
//     if (!arr.length) return [];
//     for (let item of arr) {
//         const {label, children} = item;
//         res.push(label); // 将当前节点存入结果数组中
//         // 如果当前节点有子节点，继续递归遍历其子节点
//         if (children && children.length) {
//             dfs(children, res);
//         }
//     }
//     return res;
// }

// 基于栈实现
// function dfs(node, res = []) {
//     if (!node.length) return [];
//     let stack = [node[0]];
//     while(stack.length) {
//         let {label, children} = stack.pop();
//         res.push(label);
//         if (children && children.length) {
//             for (let i = children.length - 1; i >= 0; i--) {
//                 stack.push(children[i]); // 后进先出
//             }
//         }
//     }
//     return res;
// }

function dfs(node) {
    if (!node.length) return [];
    let res = [];
    let stack = [node[0]];
    while(stack.length) {
        let {label, children} = stack.pop();
        res.push(label);
        if (children && children.length) {
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }
    }
    return res;
}
console.log(dfs(data));
/**
[ 'parent',
  '一级 1',
  '二级 1-1',
  '三级 1-1-1',
  '一级 2',
  '二级 2-1',
  '三级 2-1-1',
  '二级 2-2',
  '三级 2-2-1',
  '一级 3',
  '二级 3-1',
  '三级 3-1-1',
  '二级 3-2',
  '三级 3-2-1' ]
*/