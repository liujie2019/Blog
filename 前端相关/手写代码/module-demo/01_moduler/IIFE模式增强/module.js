/**
 * IIFE模式增强: 引入依赖
 * 这是现代模块化实现的基石
 */
;(function(window, $) {
    let a = 'module';
    // 特权方法-操作数据的函数
    function foo() {
        console.log(`foo() ${a}`);
        $('body').css('background', 'yellow');
    }
    function bar() {
        console.log(`bar() ${a}`);
        fn(); // 调用内部私有函数
    }
    // 内部私有函数
    function fn() {
        console.log('我是内部私有函数');
    }
    // 暴露属性和方法
    window.myModule = {foo, bar};
})(window, jQuery)