import './style/index.css';
const {log} = require('./common');

log('webpack');

// 创建一个 button
let btn = document.createElement('button');
btn.innerHTML = 'click me';
document.body.appendChild(btn);

// 异步加载代码
async function getAsyncComponent() {
    var element = document.createElement('div');
    /* webpackPrefetch: true */
    const { default: _ } = await import(/* webpackChunkName: "lodash" *//* webpackPreload: true */'lodash');
    element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');
    return element;
}

// 点击 button 时，懒加载 lodash，在网页上显示 Hello! dynamic imports async
btn.addEventListener('click', () => {
    getAsyncComponent().then(component => {
        document.body.appendChild(component);
    })
});