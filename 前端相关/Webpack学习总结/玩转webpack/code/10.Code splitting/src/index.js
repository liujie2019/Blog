// import {name} from './test';
// console.log(name);

// 第一种方式：
// import _ from 'lodash'; // 假设lodash库代码是 1MB

// // 假设业务逻辑代码也是 1MB
// // 那么打包后的代码体积就是2MB，用户想要看到页面的内容，需要加载2MB的js文件

// // 这样的问题在于：打包文件会很大，加载时间会很长
// console.log(_.join(['a', 'c', 'e'], '!!!'));

// // 但是像lodash这样的第三方模块，我们一般不会进行变更
// // 我们只会更改我们的业务代码
// // 但是现在的情况是，我们只要改动了业务代码，重新访问页面时，又要加载2MB的内容才能看到更新后的内容，这样是有问题的。

// // 第二种方式：
// // 将main.js拆分成两个入口：lodash.js(1MB)和main.js(1MB)
// // 这样拆分之后，当页面业务逻辑发生变化时，只要重新加载main.js(1MB)即可。因为lodash.js在浏览器中是有缓存的。

// 异步代码的Code Splitting
// function getComponent() {
//     return import(/* webpackChunkName:"lodash" */ 'lodash').then(({default: _}) => {
//         const element = document.createElement('div');
//         element.innerText = _.join(['hello', 'webpack'], '---');
//         return element;
//     });
// }

async function getComponent() {
    const {default: _} = await import(/* webpackChunkName:"lodash" */ 'lodash');
    const element = document.createElement('div');
    element.innerText = _.join(['hello', 'webpack'], '---');
    return element;
}

// getComponent().then(element => {
//     document.body.appendChild(element);
// });

document.addEventListener('click', function() {
    getComponent().then(element => {
        document.body.appendChild(element);
    });
}, false);