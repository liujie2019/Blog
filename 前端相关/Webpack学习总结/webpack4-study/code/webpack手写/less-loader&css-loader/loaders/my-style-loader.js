const loaderUtils = require('loader-utils');
function loader(source) {
    // 最后一个loader要返回一个脚本
    const str = `
        const style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
    return str;
}

// 在style-loader上写了pitch，有返回，后面的跳过，自己的写不会走
// remainingRequest：剩余的请求
loader.pitch = function (remainingRequest) {
    // /Users/xxxx/study/Blog/前端相关/Webpack学习总结/webpack4-study/code/webpack手写/less-loader&css-loader/loaders/my-css-loader.js!/Users/xxxx/study/Blog/前端相关/Webpack学习总结/webpack4-study/code/webpack手写/less-loader&css-loader/loaders/my-less-loader.js!/Users/liujie26/study/Blog/前端相关/Webpack学习总结/webpack4-study/code/webpack手写/less-loader&css-loader/src/style/index.less
    // 剩余的请求 my-css-loader!my-less-loader!./index.less
    // console.log(remainingRequest);
    // require路径 返回的就是css-loader处理好的结果require('!!css-loader!less-loader!./index.less')
    console.log(loaderUtils.stringifyRequest(this, '!!' + remainingRequest)); // "!!../../loaders/my-css-loader.js!../../loaders/my-less-loader.js!./index.less"
    const str = `
       let style = document.createElement('style')
       style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
       document.head.appendChild(style)
   `;
    // stringifyRequest方法用来将绝对路径转为相对路径
    return str;
}

module.exports = loader;