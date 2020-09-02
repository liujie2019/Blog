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

// 基于队列实现
// function bfs(node, res = []) {
//     if (!node.length) return [];
//     let queue = [node[0]];
//     while(queue.length) {
//         let {label, children} = queue.shift(); // 从队列头依次取出元素
//         res.push(label);
//         if (children && children.length) {
//             for (let i = 0; i < children.length; i++) {
//                 queue.push(children[i]);
//             }
//         }
//     }
//     return res;
// }

function bfs(node) {
    if (!node.length) return [];
    let queue = [node[0]];
    let res = [];
    while(queue.length) {
        let {label, children} = queue.shift();
        res.push(label);
        if (children && children.length) {
            for (let i = 0; i < children.length; i++) {
                queue.push(children[i]);
            }
        }
    }
    return res;
}

console.log(bfs(data));
/**
[ 'parent',
  '一级 1',
  '一级 2',
  '一级 3',
  '二级 1-1',
  '二级 2-1',
  '二级 2-2',
  '二级 3-1',
  '二级 3-2',
  '三级 1-1-1',
  '三级 2-1-1',
  '三级 2-2-1',
  '三级 3-1-1',
  '三级 3-2-1' ]
*/