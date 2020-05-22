const sleep = data => {
    return new Promise(resolve => {
        return setTimeout(() => {
            resolve(data);
        }, 1000);
    });
};

// async function say() {
//     const data = await sleep('test1');
//     console.log(data);
//     const data2 = await sleep('test2');
//     console.log(data2);
//     return 'done';
// }

// say().then(data => console.log(data));

// 用generator改写
function* say() {
    const data = yield sleep('test1');
    console.log('data：', data);
    const data2 = yield sleep('test2');
    console.log('data2：', data2);
    return 'done';
}

const it = say();
// console.log(it);
console.log(it.next());
console.log(it.next(111));
console.log(it.next(222));
it.next();