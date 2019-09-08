// resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例

const p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'p1 done');
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(p1), 1000);
});

p2.then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});