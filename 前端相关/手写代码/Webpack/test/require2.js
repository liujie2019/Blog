// define声明模块 通过require使用一个模块
// 实现循环依赖
let factories = {};
// 模块的名字 依赖 工厂函数
function define(moduleName, dependencies, factory) {
    factory.dependencies = dependencies; // 将依赖记到factory上
    factories[moduleName] = factory;
}

function require(mods, callback) {
    let result = mods.map(function(mod) { // name, age
        let factory = factories[mod];
        let exports;
        let dependencies = factory.dependencies; // ['name]
        require(dependencies, function() {
            console.log(arguments);
            // ...args
            exports = factory.apply(null, arguments);
        });
        return exports;
    });
    // 这里不改变this指向，所以传入null
    callback.apply(null, result);
}

define('name', [], function() {
    return 'lisi';
});
// age依赖name
define('age', ['name'], function(name) {
    return name + 23;
});

require(['age'], function(age) {
    console.log(age);
});