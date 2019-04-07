function getNumber() {
    let p = new Promise((resolve, reject) => {
        // 一些异步操作
        setTimeout(() => {
            // 向上取整生成1-10的随机数
            let num = Math.ceil(Math.random() * 10);
            if (num < 5) {
                resolve(num);
            }
            else {
                reject('数字太大');
            }
        }, 1000);
    });
    return p;
};

getNumber().then(data => {
    console.log('resolved');
    console.log(data);
    console.log(sum);
})
.catch(error => {
    console.log('rejected');
    console.log(error);
});