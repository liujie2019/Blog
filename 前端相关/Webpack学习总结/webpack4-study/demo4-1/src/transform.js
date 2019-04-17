module.exports = function (css) { // 传入的参数是css字符串本身
    console.log(css);
    const transformed = css.replace('yellow', 'green')
    // 如果屏幕宽度小于800，则替换背景颜色
    return window.innerWidth < 800 ? transformed : css;
}