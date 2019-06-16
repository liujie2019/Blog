function cloneLoop(x) {
    const root = {}; // 最初的父元素
    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];
    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data; // 存放要遍历的数据

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent; // 最初是一个{}
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                    console.log(root);
                }
            }
        }
    }
    return root;
}
const a = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    }
};
const new_a = cloneLoop(a);
new_a.a2.b1 = 1111;
// console.log(new_a, a);
