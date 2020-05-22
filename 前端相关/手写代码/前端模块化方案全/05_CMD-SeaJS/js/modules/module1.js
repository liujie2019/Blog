define(function (require, exports, module) {
    // 内部变量数据
    var data = 'module1'
    // 内部函数
    function foo() {
      console.log('module1 show() ' + data);
    }
    //向外暴露
    exports.foo = foo;
})