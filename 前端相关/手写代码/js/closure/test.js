/*
理解：什么是闭包？
1. 密闭的容器，类似于set，map容器，存储数据的
2. 闭包是一个对象，存放数据的格式：key: value

闭包形成的条件：
1. 函数嵌套；
2. 内部函数引用外部函数的局部变量
*/
function fn1() {
    var num = 2;
    function fn2() {
        console.log(num);
    }
    fn2();
}
fn1();