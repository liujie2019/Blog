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
const deepTraversal = ((node, nodeList = []) => {
    if (node.length) {
        for (let i = 0; i < node.length; i++) {
            const {label, children} = node[i];
            nodeList.push(label);
            if (children && children.length) {
                // 递归
                deepTraversal(children, nodeList);
            }
        }
    }
    return nodeList;
});
const result = deepTraversal(data);
console.log(result);