// 思路：从webpack.config.js中拿到babel的预设，通过预设来转换模块
// 先引入babel
const babel = require('@babel/core');
// 拿到babel的参数，使用loader-utils
const loaderUtils = require('loader-utils');
function loader(source) {
    // this是loader的上下文
    const options = loaderUtils.getOptions(this);
    // console.log(Object.keys(this));
    // console.log(options); // { presets: [ '@babel/preset-env' ] }
    // console.log(this.resourcePath); // /Users/xxxx/study/Blog/前端相关/Webpack学习总结/webpack4-study/code/webpack手写/babel-loader-demo/src/index.js
    // babel的转换是异步的，同步的返回是不行的，不能用return
    // 同步就是直接调用，异步会在async中
    const callback = this.async();
    // console.log(this.resourcePath.split('/').pop());
    babel.transform(source, {
        ...options,
        sourceMap: true, // 设置生成sourceMap，还需要再webpack.config.js中配置devtool: 'source-map'
        // pop方法删除数组的最后一个元素，并返回该元素，会影响原数组
        // 给生成的source-map指定名字
        filename: this.resourcePath.split('/').pop()
    }, (err, result) => {
        // console.log(Object.keys(result)); // [ 'metadata', 'options', 'ast', 'code', 'map', 'sourceType' ]
        // result.map是sourceMap
        callback(err, result.code, result.map);
    });
    // return source; // 不起作用了
}
module.exports = loader;