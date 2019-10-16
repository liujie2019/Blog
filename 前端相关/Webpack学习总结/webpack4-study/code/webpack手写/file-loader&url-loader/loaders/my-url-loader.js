// 拿到loader的参数 需要工具包loaderUtils
const loaderUtils = require('loader-utils');
const mime = require('mime');  // 作用是设置某种扩展名的文件的响应程序类型

function loader(source) {  // loader的参数就是源代码
    const {limit} = loaderUtils.getOptions(this);
    // console.log(this.resourcePath);
    // 如果图片小于limit，则使用base64编码
    if (limit && limit > source.length) {
        return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        return require('./my-file-loader').call(this, source);
    }
}
loader.raw = true; // 二进制
module.exports = loader;