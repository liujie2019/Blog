const sleep = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('暂停3秒了');
        }, time);
    });
}

const start = async () => {
    console.log('start...');
    console.log(await sleep(3000)); // 停顿3秒
    console.log('end...');
}

start();