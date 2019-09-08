// 看一个闭包的例子
function outer() {
    var a = 1; // 定义一个内部变量
    return function() {
        return a; // 返回a
    };
}

var fn = outer();
console.log(fn()); // 1