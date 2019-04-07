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

function runAsync2() {
    let p = new Promise((resolve, reject) => {
        // 一些异步操作
        setTimeout(() => {
            console.log('执行完了2');
            resolve('一些数据2');
        }, 2000);
    });
    // return一个Promise对象
    return p;
}

function runAsync3() {
    let p = new Promise((resolve, reject) => {
        // 一些异步操作
        setTimeout(() => {
            console.log('执行完了3');
            resolve('一些数据3');
        }, 2000);
    });
    // return一个Promise对象
    return p;
}

Promise.all([runAsync(), runAsync2(), runAsync3()])
.then(result => {
    console.log(result);
});