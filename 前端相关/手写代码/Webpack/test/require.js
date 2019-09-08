// define声明模块 通过require使用一个模块
let factories = {};
// 模块的名字 依赖 工厂函数
function define(moduleName, dependencies, factory) {
    factories[moduleName] = factory;
}

function require(mods, callback) {
    let result = mods.map(function(mod) { // name, age
        let factory = factories[mod];
        let exports = factory();
        return exports;
    });
    // 这里不改变this指向，所以传入null
    callback.apply(null, result);
}

define('name', [], function() {
    return 'lisi';
});
define('age', [], function() {
    return 22;
});

require(['name', 'age'], function(name, age) {
    console.log(name + age);
});