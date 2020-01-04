async function fn1() {
    console.log(1);
    const result = await fn2();
    console.log(2);
}

async function fn2() {
    console.log(3);
    return new Promise((resolve, reject) => {
        // resolve();
    }).then(() => {
        console.log(4)
    });
}

Promise.resolve().then(() => {
    console.log(5)
});

fn1();
console.log(6);
// 1 3 6 5 4 2