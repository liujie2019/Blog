// 函数作为参数传递

function fn() {
    var a = 10;
    return function() {
        console.log(a);
    }
}
var f1 = fn();
function fn2(f1) {
    var a = 20;
    f1(); // 10
}
fn2(f1);