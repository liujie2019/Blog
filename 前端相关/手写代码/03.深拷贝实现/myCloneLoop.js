/**
 * 循环破解递归爆栈
*/

function cloneLoop(source) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: source
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const {parent, key, data} = node;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'object') {
                    loopList.push({
                        parent: res,
                        key: key,
                        data: data[key]
                    });
                } else {
                    res[key] = data[key];
                }
            }
        }
    }

    return root;
}