// diff方法接收两个虚拟DOM
function diff(oldTree, newTree) {
    const patches = {};
    // 先遍历树的第一项
    let index = 0; // 标识树的节点索引
    // 递归树 比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches; // 最后将补丁包返回
}
// 定义一些常量来标识节点的变化类型，即补丁包对象的类型
const ATTRS = 'ATTRS'; // 节点属性发生变化
const TEXT = 'TEXT'; // 节点文本发生变化
const REMOVE = 'REMOVE'; // 删除节点
const REPLACE = 'REPLACE'; // 替换节点

let Index = 0; // 维护一个全局的节点索引，每次调用walk的时候都基于这个索引
/**
 * @param  {any} oldChildren 老节点的子节点
 * @param  {any} newChildren 新节点的子节点
 * @param  {any} patches 总的补丁包
 * @return {void}
 */
function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个
    // 这里需要循环oldChildren而不是newChildren，因为新节点的子节点有可能被删除了
    oldChildren.forEach((child, index) => {
        // 索引不应该是index了
        // 每次传递给walk时，index是递增的，所有元素都基于一个索引值来遍历
        walk(child, newChildren[index], ++Index, patches);
    });
}

// 字符串判断函数
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}
/**
 * 节点属性不同的情况：
 * 1. 新老节点中都存在该属性，但是属性值发生了改变
 * 2. 新节点中找不到对应属性，说明该属性被删除了
 * 3. 老节点中找不到对应属性，说明该属性是新增的
 * @param  {any} oldAttrs
 * @param  {any} newAttrs
 * @return
 */
function diffAttr(oldAttrs, newAttrs) {
    const patch = {};
    // 判断老节点的属性和新节点的属性的关系
    // 先遍历老节点属性，找出发生改变的属性和被删除的节点
    for (let key in oldAttrs) {
        // 如果属性发生变化，放到补丁包对象中
        if (oldAttrs[key] !== newAttrs[key]) {
            // newAttrs[key]有可能是undefined，新的节点被删除了
            patch[key] = newAttrs[key];
        }
    }
    // 然后遍历新的节点属性，找出新增的属性
    for (let key in newAttrs) {
        // 如果老的节点属性中找不到相应属性，说明该属性为新增的
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

// index被私有化到了walk作用域内
function walk(oldNode, newNode, index, patches) {
    // 存放当前节点的补丁对象
    const currentPatch = []; // 每个元素都有一个补丁对象
    if (!newNode) { // 当新节点被删除时
        // 记录哪个索引的节点被删除了
        currentPatch.push({type: REMOVE, index});
    }
    // 如果节点是字符串，说明是文本节点
    else if (isString(oldNode) && isString(newNode)) { // 判断文本节点内容是否发生变化
        if (oldNode !== newNode) {
            currentPatch.push({type: TEXT, text: newNode});
        }
    }
    else if (oldNode.type === newNode.type) { // 如果节点的类型相同，则比较节点的属性
        // 比较属性是否有更改，节点的props属性存放的是当前节点的所有属性
        const attrs = diffAttr(oldNode.props, newNode.props);
        // console.log(attrs);
        // length大于0说明当前节点属性发生了变化
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs})
        }
        // 如果当前节点存在子节点，继续递归遍历子节点(深度遍历)
        diffChildren(oldNode.children, newNode.children, patches);
    }
    else { // 上面情况都不满足，说明当前节点被替换了，即节点类型发生变化，比如由li变为div
        // 记录变化后的新的节点值，即newNode
        currentPatch.push({type: REPLACE, newNode});
    }
    // currentPatch.length大于0 说明当前元素发生了变化，确实有补丁
    if (currentPatch.length > 0) {
        // 将元素和补丁包对应起来，放到最终的补丁包中，index为当前节点的索引值
        patches[index] = currentPatch;
    }
}

export default diff;