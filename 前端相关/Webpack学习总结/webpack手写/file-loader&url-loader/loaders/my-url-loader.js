// 拿到loader的参数 需要工具包loaderUtils
const loaderUtils = require('loader-utils');
const mime = require('mime');  // 作用是设置某种扩展名的文件的响应程序类型

// 这里source是Buffer
function loader(source) {  // loader的参数就是源代码
    const {limit} = loaderUtils.getOptions(this);
    // console.log(this.resourcePath);
    // 如果图片小于limit，则使用base64编码
    // console.log(source); Buffer
    // console.log(source.toString('base64'));
    // mime.getType(this.resourcePath) 是文件类型
    if (limit && limit > source.length) {
        return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        // limit小于文件大小时还是走file-loader
        return require('./my-file-loader').call(this, source);
    }
}
loader.raw = true; // 二进制
module.exports = loader;