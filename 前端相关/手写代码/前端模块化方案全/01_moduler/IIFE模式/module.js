/**
 * IIFE模式: 匿名函数自执行(闭包)
 * IIFE : immediately-invoked function expression(立即调用函数表达式)
 * 作用: 数据是私有的, 外部只能通过暴露的方法操作
 * 问题: 如果当前这个模块依赖另一个模块怎么办?
 */
;(function(window) {
    let a = 'module';
    // 特权方法-操作数据的函数
    function foo() {
        console.log(`foo() ${a}`);
    }
    function bar() {
        console.log(`bar() ${a}`);
        fn();
    }
    // 内部私有函数
    function fn() {
        console.log('我是内部私有函数');
    }
    // 暴露属性和方法
    window.myModule = {foo, bar};
})(window)