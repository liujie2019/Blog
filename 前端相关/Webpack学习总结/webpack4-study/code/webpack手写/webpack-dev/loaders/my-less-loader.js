/**
 * 每个loader实际上都是一个函数
 * 该loader将less转为css
 */
const less = require('less');
// source是对应的源码，source是loader的参数
const myLessLoader = source => {
    let css = '';
    less.render(source, (err, output) => {
        css = output.css;
    });
    css = css.replace(/\n/g, '\\n');
    return css;
}
// 导出loader
module.exports = myLessLoader;