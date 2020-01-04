// const p1 = Promise.resolve(123);
const p1 = Promise.reject('出错了');
const p2 = 234;
const p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 345);
});

Promise.all([p1, p2, p3]).then(data => {
    console.log(data);
}).catch(err => {
    console.log('err', err);
});