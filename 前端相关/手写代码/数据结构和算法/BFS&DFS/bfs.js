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
const bfsTraversal = ((node, nodeList = []) => {
    const queue = []; // 基于队列的先进先出
    if (node.length) {
        queue.push(node[0]);
        while (queue.length) {
            const item = queue.shift();
            nodeList.push(item.label);
            if (item.children) {
                const children = item.children;
                for (let j = 0; j < children.length; j++) {
                    queue.push(children[j]);
                }
            }
        }
    }
    return nodeList;
});
const result = bfsTraversal(data);
console.log(result);