/**
 * loader就是一个函数，参数就是文件源码
 * @param {*} source参数就是文件源码
 */
const path = require('path');
const loader = function(source) {
    // 当前loader仅仅在源码后面追加了一段文字
    this.emitFile('a.js', source); // 向dist目录发射文件
    return source + '我是手写loader处理过的';
}

module.exports = loader;