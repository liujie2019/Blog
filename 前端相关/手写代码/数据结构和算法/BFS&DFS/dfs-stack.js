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
    const stack = [];
    if (node.length) {
        stack.push(node[0]);
        while (stack.length) {
            const item = stack.pop();
            nodeList.push(item.label);
            console.log(item);
            if (item.children) {
                const children = item.children;
                for (let i = children.length - 1; i >= 0; i--) {
                    stack.push(children[i]);
                }
            }
        }
    }
    return nodeList;
});
const result = deepTraversal(data);
console.log(result);