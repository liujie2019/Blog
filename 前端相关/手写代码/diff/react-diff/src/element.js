// 虚拟DOM元素的类
class Element {
    constructor(type, props, children) {
        // 将参数挂载到实例的私有属性上
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
// 创建虚拟dom节点，返回object
function createElement(type, props, children) {
    return new Element(type, props, children);
}

/**
 * 给DOM元素设置属性
 * @param  {any} node 当前dom元素
 * @param  {any} key 属性名称
 * @param  {any} value 属性值
 * @return {void}
 */
function setAttr(node, key, value) {
    switch (key) {
        // key是value的情况，需要判断是否为输入框
        case 'value': // node是一个input或者textarea
            if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value;
            } else { // 其他情况直接调用setAttribute
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value; // 设置行内样式
            break;
        default: // 默认为普通属性，直接调用setAttribute赋值即可
            node.setAttribute(key, value);
            break;
    }
}
// render方法可以将vnode转化为真实dom
function render(eleObj) {
    const {type, props, children} = eleObj;
    // 调用createElement创建dom元素
    const el = document.createElement(type);
    for (let key in props) {
        // 给当前dom元素设置属性
        setAttr(el, key, props[key]);
    }
    // 遍历子节点，如果是虚拟dom继续渲染，不是就代表的是文本节点
    children.forEach(child => {
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
    renderDom,
    setAttr
}