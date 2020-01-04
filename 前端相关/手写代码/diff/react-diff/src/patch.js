import {
    render,
    Element
} from './element';
import {setAttr} from './element';

let allPatches;
let index = 0;
// node是真实dom，给真实dom打补丁
function patch(node, patches) {
    allPatches = patches;
    walk(node); // 给变化的元素打补丁
}

// 重新遍历老树，对变化的节点打补丁
function walk(node) {
    // 默认取出补丁包中的第一个补丁
    const currentPatch = allPatches[index++];
    // childNodes属性返回节点的子节点集合，是一个NodeList对象
    const childNodes = node.childNodes;
    childNodes.forEach(child => {
        walk(child);
    });
    if (currentPatch) {
        // 打补丁的顺序是逆序，先给子节点打，最后给根节点打
        doPatch(node, currentPatch);
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for (let key in patch.attrs) {
                    const value = patch.attrs[key];
                    if (value) {
                        setAttr(node, key, value);
                    }
                    else { // 没有值，表示该属性不要了，直接删除
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                // textContent属性设置或者返回指定节点的文本内容
                node.textContent = patch.text;
                break;
            case 'REPLACE': // 节点替换
                // 如果新节点是一个Element，即虚拟DOM元素，需要先调用render方法将其渲染成真实的DOM
                const newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE': // 节点删除
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    })
}

export default patch;