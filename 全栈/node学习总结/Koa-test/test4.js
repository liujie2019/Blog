function a() {
    console.log(1);
    b(); // 函数b进栈，函数a将执行权交给函数b
    console.log(2); // 函数a执行完毕出栈
}
function b() {
    console.log(3);
    c(); // 函数c进栈，函数b将执行权交给函数c
    console.log(4); // 函数b执行完毕出栈，将执行权返还给函数a
}
function c() {
    console.log(5); // 函数c执行完毕出栈，将执行权返还给函数b
}
a(); // 函数a进栈