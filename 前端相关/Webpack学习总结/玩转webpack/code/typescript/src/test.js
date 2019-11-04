module.exports = {
    'parser': 'babel-eslint', // 指定解析器
    'parserOptions': { // 指定解析器选项
        'ecmaVersion': 2017, // 启用ES8语法支持
        'sourceType': 'module', // module表示ECMAScript模块
        'ecmaFeatures': { // 使用额外的语言特性
            'experimentalObjectRestSpread': true,
            'jsx': true,
            'modules': true,
        }
    },
    'env': { // 指定脚本的运行环境，可以同时定义多个
        'browser': true,
        'node': true,
        'commonjs': true,
        'es6': true,
    },
    'root': true, // 别人可以直接使用你配置好的ESLint
    'globals': {}, // 脚本在执行期间访问的额外的全局变量
    'rules': { // 配置各种规则及其各自的错误级别
        // 关键字前后必须有空格
        'keyword-spacing': 0,
        // new 关键字后类应包含圆括号
        'new-parens': 2,
        // 禁止 alert
        'no-alert': 1
    }
};
