function myModule() {
    // 私有数据
    var name = 'lisi';
    // 操作数据的函数，称为特权函数
    function foo() {
        console.log('foo---', name.toUpperCase());
    }
    function bar() {
        console.log('bar---', name.toLowerCase());
    }
    // 向外暴露对象(给外部使用的方法)
    return {
        foo,
        bar
    }
}