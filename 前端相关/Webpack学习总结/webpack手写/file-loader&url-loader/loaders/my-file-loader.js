const loaderUtils = require('loader-utils');
const path = require('path');

// file-loader只是对文件进行复制移动到固定目录
function loader(source) {
    // '[name].[ext]'
    const {output} = loaderUtils.getOptions(this);
    // console.log(output); // { output: '/assets' }
    // interpolateName获取文件的hash值，并插入值，生成唯一的文件名
    // const interpolatedName = loaderUtils.interpolateName(loaderContext, name, options);
    // this代表loader上下文
    const filename = loaderUtils.interpolateName(this, '[name].[hash:8].[ext]', {content: source});
    if (output) {
        this.emitFile(path.resolve(__dirname, output, filename), source);
    } else {
        this.emitFile(filename, source);
    }
    // console.log(filename); // avatar.9a70fede.jpg
    // console.log('my-file-loader');
    // 把原来的路径变成编译后的路径
    return `module.exports='${filename}'`;
}
loader.raw = true; // 二进制
module.exports = loader;