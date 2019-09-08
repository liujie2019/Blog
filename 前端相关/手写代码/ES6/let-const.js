// let const解决了哪些问题
// var的特点
// 1. 变量声明提升
// 2. var可以重复赋值
// 3. js之前并没有块级作用域，var声明的变量会污染全局变量，但是let声明的变量不会污染全局变量
// 4.
// 尽可能使用const，如果这个值需要更改才使用let
var a = 1;
{
    var a = 2;
}
console.log(a); // 2

let b = 2;
{
    // console.log(b); // 报错，暂时性死区
    let b = 3; // 这里的b和花括号外面的b不一样，可以用babel编译一下就可以看出来
}
console.log(b); // 2

for (let i = 0; i < 10; i++) {
    // 作用域链
    setTimeout(() => {
        console.log(i);
    }); // 最小延迟4ms
}

// var i = 0;会把a声明到全局
for (var i = 0; i < 10; i++) {
    // 作用域链
    setTimeout(() => {
        console.log(i); // 打印出10个10
    }); // 最小延迟4ms
}