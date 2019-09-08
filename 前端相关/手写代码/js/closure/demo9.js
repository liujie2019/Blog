// var x;
// for (var i = 0, j = 0; i < 6, j < 10; i++, j++) {
//     x = i + j;
// }

// console.log(x); // 18

// var bar = 1;
// function test() {
//     console.log(bar); // undefined
//     var bar = 2;
//     console.log(bar); // 2
// }
// test();
// 优先级顺序
// 函数声明提升 > 参数 > 变量声明提升
// function test(bar) {
//     function bar() {
//         return '1';
//     }
//     console.log(bar); // [Function: bar]
//     var bar = 2;
//     function bar() {
//         return '2';
//     }
// }
// test(3);

var foo = function() {
    console.log(1);
}
function foo() {
    console.log(2);
}

foo(); // 1

