// 1. index.js 进行原生的Promise演示
// 2. promise.js 进行自定义的Promise演示
// 3. test.js 是对promise.js进行测试
// 4. 开发过程结合promise/a+规范
console.log(1);
new Promise((resolve, reject) => {
    // console.log(2);
    throw Error('出错了');
    resolve(1);
    // setTimeout(() => {
    //     resolve(1);
    // }, 0);
}).then() // 穿透了
.then(value => {
    console.log(4);
    console.log('value', value);
}, error => {
    console.log('error', error);
});
console.log(3);

// new Promise(1);