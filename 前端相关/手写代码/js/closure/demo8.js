// 考察js异步、闭包
// for循环是执行主体，for循环执行完毕才会执行setTimeout异步队列
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000 * i);
}
// 首先立即输出3，然后分别隔1秒和2秒再输出3
/*
setTimeout(function() {
    console.log(i); // 3
}, 0);
setTimeout(function() {
    console.log(i); // 3
}, 1000);
setTimeout(function() {
    console.log(i); // 3
}, 2000);
*/
