// Promise是一个类，可以创建实例

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        let num = Math.random(); // 生成随机数
        if (num > .5) {
            resolve(num);
        }
        else {
            reject('error:' + num);
        }
    }, 2000);
});

p.then(data => {
    console.log(data);
}, err => {
    console.log(err);
});