function diff(oldTree, newTree) {
    const patches = {};
    // 先遍历树的第一项
    let index = 0;
    // 递归树 比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches;
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;
function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, index) => {
        // 索引不应该是index了
        // index 没次传递给walk时，index是递增的，所有元素都基于一个索引值来遍历
        walk(child, newChildren[index], ++Index, patches);
    });
}
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}
// index被私有化到了walk作用域内
function walk(oldNode, newNode, index, patches) {
    // 存放当前节点的补丁对象
    const currentPatch = []; // 每个元素都有一个补丁对象
    if (!newNode) { // 当新节点被删除时
        // 记录哪个索引的节点被删除了
        currentPatch.push({type: REMOVE, index});
    }
    else if (isString(oldNode) && isString(newNode)) { // 判断文本节点内容是否发生变化
        if (oldNode !== newNode) {
            currentPatch.push({type: TEXT, text: newNode});
        }
    }
    else if (oldNode.type === newNode.type) { // 如果节点的类型相同，则比较节点的属性
        // 比较属性是否有更改
        const attrs = diffAttr(oldNode.props, newNode.props);
        // console.log(attrs);
        // length大于0说明当前节点属性发生了变化
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs})
        }
        // 如果有子节点，继续遍历子节点
        diffChildren(oldNode.children, newNode.children, patches);
    }
    else { // 上面情况都不满足，说明当前节点被替换了，即节点类型发生变化，比如由li变为div
        // 记录变化后的新的节点值，即newNode
        currentPatch.push({type: REPLACE, newNode});
    }
    // currentPatch.length大于0 说明当前元素发生了变化，确实有补丁
    if (currentPatch.length > 0) {
        // 将元素和补丁包对应起来，放到最终的补丁包中 index为当前节点的索引值
        patches[index] = currentPatch;
    }
}

function diffAttr (oldAttrs, newAttrs) {
    const patch = {};
    // 判断老的属性和新的属性的关系
    for (let key in oldAttrs) {
        // 如果属性发生变化，放到补丁包对象中
        if (oldAttrs[key] !== newAttrs[key]) {
            // newAttrs[key]有可能是undefined，新的节点被删除了
            patch[key] = newAttrs[key];
        }
    }
    // 遍历新的节点属性
    for (let key in newAttrs) {
        // 如果老的节点属性中找不到相应属性，说明该属性为新增的
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

export default diff;