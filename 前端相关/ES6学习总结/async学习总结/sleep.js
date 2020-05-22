function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function say() {
    for (let i = 0; i < 5; i++) {
        await sleep(1000);
        console.log(i + 1);
    }
}

say();
