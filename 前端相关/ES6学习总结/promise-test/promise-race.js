const p1 = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, '1秒延迟');
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, '2秒延迟');
});

Promise.race([p1, p2]).then(data => {
    console.log(data);
}).catch(err => {
    console.log('err', err);
});

