const loaderUtils = require("loader-utils");

module.exports = function(content) {
    // 获取用户配置的options
    const options = loaderUtils.getOptions(this);
    console.log('***options***', options);
    return "{test123567};" + content;
}