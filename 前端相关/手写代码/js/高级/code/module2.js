(function(window) { // 这里的window是形参，是一个局部变量
    // 推荐使用，不需要调用函数
    // 私有数据
    var name = 'wangwu';
    // 操作数据的函数，称为特权函数
    function foo() {
        console.log('foo---', name.toUpperCase());
    }
    function bar() {
        console.log('bar---', name.toLowerCase());
    }
    // 向外暴露对象，将要暴露的对象挂载到window对象上
    window.module = {
        foo,
        bar
    };
})(window); // 这里window可传可不传，传了方便代码压缩