/**
 * 第二个请求需要第一个请求返回的数据作为参数发送给第二个请求，层层回调就容易形成回调地狱。
 * Promise是解决异步回调的一种编程方案。
*/
console.log(200);
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log(a);
        reject();
    }, 100);
    console.log(100);
});

p.then(() => {
    console.log('成功');
}, () => {
    // 在then中的函数如果抛出异常，或者是报错，浏览器不会报错，而是直接走reject
    console.log(a);
}).then(() => {
    console.log('成功2');
}, () => {
    console.log('失败');
});
console.log(300);
