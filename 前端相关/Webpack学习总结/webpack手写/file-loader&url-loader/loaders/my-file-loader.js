const loaderUtils = require('loader-utils');

function loader(source) {
    // '[name].[ext]'
    const filename = loaderUtils.interpolateName(this, '[name].[hash:8].[ext]', {content: source});
    this.emitFile(filename, source);
    // console.log('my-file-loader');
    return `module.exports='${filename}'`;
}
loader.raw = true; // 二进制
module.exports = loader;