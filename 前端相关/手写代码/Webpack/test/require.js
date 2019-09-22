// define声明模块 通过require使用一个模块
let factories = {};
// 模块的名字 依赖 工厂函数
function define(moduleName, dependencies, factory) {
    // 将模块名称和函数一一对应
    factories[moduleName] = factory;
}

function require(mods, callback) {
    // 生成结果数组result
    const result = mods.map(mod => { // name, age
        const factory = factories[mod];
        const exports = factory();
        return exports;
    });
    // 这里不改变this指向，所以传入null
    callback.apply(null, result);
}
// 定义一个无依赖的name模块
define('name', [], () => {
    return 'lisi';
});
// 定义一个age模块
define('age', [], () => {
    return 22;
});
// 引入模块
require(['name', 'age'], (name, age) => {
    console.log(name + age);
});