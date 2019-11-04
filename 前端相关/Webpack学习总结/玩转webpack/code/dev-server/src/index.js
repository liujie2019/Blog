// import './index.less';
// const btn = document.createElement('button');
// btn.innerText = '新增';
// document.body.appendChild(btn);

// btn.addEventListener('click', function() {
//     const box = document.createElement('div');
//     box.innerText = 'item';
//     document.body.appendChild(box);
// }, false);

import counter from './counter';
import number from './number';

counter();
number();

if (module.hot) {
    module.hot.accept('./number', () => {
        document.body.removeChild(document.querySelector('#number'));
        number();
    });
}