// 虚拟dom元素的类
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
// 创建虚拟dom节点，返回object
function createElement(type, props, children) {
    return new Element(type, props, children);
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
// render方法可以将vnode转化为真实dom
function render(eleObj) {
    const el = document.createElement(eleObj.type);
    for (let key in eleObj.props) {
        // 设置元素属性的方法
        setAttr(el, key, eleObj.props[key]);
    }
    // 遍历子节点，如果是虚拟dom继续渲染，不是就代表的是文本节点
    eleObj.children.forEach(child => {
        // 判断当前子节点是否Element类型，是的话则为虚拟DOM节点，递归调用render方法渲染，否则返回一个文本节点
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        el.appendChild(child);
    });
    return el;
}
// 将元素插入页面中
function renderDom(el, target) {
    target.appendChild(el);
}
export {
    createElement,
    render,
    Element,
    renderDom
}