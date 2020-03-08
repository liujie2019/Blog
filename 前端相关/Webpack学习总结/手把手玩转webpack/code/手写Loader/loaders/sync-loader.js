// 同步loader
const loaderUtils = require('loader-utils');
function syncLoader(source) {
    // return '!!!' + source;
    // 该loader仅仅是将源代码中的loader字符串替换为hello
    console.log(this.query); // { name: 'lisi' }
    const options = loaderUtils.getOptions(this);
    console.log(options); // { name: 'lisi' }
    return source.replace('asyncLoader', 'world');
}

module.exports = syncLoader;