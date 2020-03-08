// css热替换
// import './index.less';
// const btn = document.createElement('button');
// btn.innerText = '新增';
// document.body.appendChild(btn);

// btn.addEventListener('click', () => {
//     const box = document.createElement('div');
//     box.innerText = 'item';
//     document.body.appendChild(box);
// }, false);

// js热替换
import counter from './counter';
import number from './number';

counter();
number();

if (module.hot) {
    // 当number.js文件发生变化时，执行相应的回调函数
    module.hot.accept('./number', () => {
        // 先删除老的节点
        document.body.removeChild(document.querySelector('#number'));
        // 重新插入新的节点
        number();
    });
}