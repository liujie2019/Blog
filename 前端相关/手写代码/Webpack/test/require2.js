// define声明模块 通过require使用一个模块
// 实现循环依赖
let factories = {};
// 模块的名字 依赖 工厂函数
function define(moduleName, dependencies, factory) {
    factory.dependencies = dependencies; // 将依赖记到factory上
    factories[moduleName] = factory;
}

function require(mods, callback) {
    // result为结果数组
    const result = mods.map(function(mod) { // name, age
        // console.log(mod);
        const factory = factories[mod];
        let exports;
        // 获取当前模块的依赖
        const dependencies = factory.dependencies;
        // 递归调用
        // name和weight的dependencies都是[]
        require(dependencies, function() {
            // console.log(arguments);
            // ...args
            exports = factory.apply(null, arguments);
        });
        // console.log(exports);
        return exports;
    });
    // console.log(result);
    // 这里不改变this指向，所以传入null
    callback.apply(null, result);
}

define('name', [], function() {
    return 'lisi';
});
define('weight', [], function() {
    return '90';
});
// age模块依赖name模块
define('age', ['name', 'weight'], function(name, weight) {
    return name + 23 + '---' + weight;
});

require(['age'], function(age) {
    console.log(age);
});
/**
1. require(['age'])
2. require(['name', 'weight']
*/