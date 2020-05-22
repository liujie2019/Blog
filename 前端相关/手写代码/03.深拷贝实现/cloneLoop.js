/**
 * 循环破解递归爆栈
*/

function cloneLoop(x) {
    // {a: 1, b: {c: 2}}
    const root = {};

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
        console.log(node);
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                // 如果是属性值是对象类型，则放入栈中
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else { // 否则直接拷贝
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

function createData(deep, breadth) {
    let data = {};
    let temp = data;
    for (let i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for (let j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }
    return data;
}

let obj = {a: 1, b: {c: 2, d: {e: 3}}};
let obj2 = cloneLoop(obj);

console.log(obj, obj2); // { a: 1, b: { c: 2 } } { a: 1, b: { c: 2 } }

// console.log(cloneLoop(createData(10000)));