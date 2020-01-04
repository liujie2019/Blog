console.log(200);
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(a);
    }, 100);
    // reject();
    // console.log(100);
});

p.then(() => {
    console.log('成功');
}, () => {
    // 在then中的函数如果抛出异常，或者是报错，浏览器不会报错，而是直接走reject
    console.log('111');
}).then(() => {
    console.log('成功2');
}, () => {
    console.log('失败');
});
console.log(300);