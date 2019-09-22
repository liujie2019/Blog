// 定义无依赖模块
define(function() {
    let a = 'test666';
    function foo() {
        return a.toUpperCase();
    }
    return {foo};
});