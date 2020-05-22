/**
 * @param {*} source参数就是文件源码
 */
const loader = source => {
    // 当前loader仅仅在源码后面追加了一段文字
    console.log('my-loader2');
    return source + '我是手写loader处理过的';
}

loader.pitch = () => {
    console.log('我是loader2 的pitch');
    // return '我有返回值-阻断了';
}

module.exports = loader;