function runAsync() {
    let p = new Promise((resolve, reject) => {
        // 一些异步操作
        setTimeout(() => {
            console.log('执行完了');
            resolve('一些数据');
        }, 2000);
    });
    // return一个Promise对象
    return p;
}

runAsync().then(data => {
    console.log(data);
});