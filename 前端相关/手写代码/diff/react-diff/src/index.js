import {
    createElement, // 创建虚拟DOM方法
    render,
    renderDom
} from './element';
import diff from './diff';
import patch from './patch';

const virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['科比']),
    createElement('li', {class: 'item'}, ['詹姆斯']),
    createElement('li', {class: 'item'}, ['罗斯'])
]);

const virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['韦德']),
    createElement('li', {class: 'item'}, ['詹姆斯']),
    createElement('div', {class: 'item'}, ['库里'])
]);

// console.log(virtualDom);
const el = render(virtualDom);
console.log(el);
// window.root与document.querySelector('#root')等价
// 将虚拟dom转化为了真实的dom，并添加到页面中
renderDom(el, window.root);

// 通过diff算法产生一个补丁对象
const patches = diff(virtualDom, virtualDom2);
console.log(patches);
// 给元素打补丁，重新更新视图
patch(el, patches);
// console.log(el);

// DOM diff比较两个虚拟dom的区别 实际上就是比较两个对象的区别
// DOM diff作用：根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom

// 目前还存在的问题：
// 如果平级元素有互换，会导致重新渲染  -> 基于key实现顺序交换
// 新增节点也不会更新