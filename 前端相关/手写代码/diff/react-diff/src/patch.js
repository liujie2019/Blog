import { render, Element } from "./element";

let allPatches;
let index = 0;
// node是真实dom，给真实dom打补丁
function patch(node, patches) {
    allPatches = patches;
    walk(node);
    // 给变化的元素打补丁
}

function walk(node) {
    let currentPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => {
        walk(child);
    });
    if (currentPatch) {
        // 打补丁的顺序是逆序，先给子节点打，最后给根节点打
        doPatch(node, currentPatch);
    }
}

// 给元素设置属性
function setAttr(node, key, value) {
    switch (key) {
        // key是value的情况，需要判断是否为输入框
        case 'value': // node是一个input或者textarea
            if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
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
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                const newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    })
}

export default patch;