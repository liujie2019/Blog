function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('sleep 2 second');
        }, second);
    });
}

function normalFunc() {
    console.log('normalFunc');
}

async function demo2() {
    await normalFunc();
    console.log('test demo');
    const res = await sleep(2000);
    console.log(res);
}

demo2();