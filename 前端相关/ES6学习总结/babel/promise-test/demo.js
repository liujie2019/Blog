const step1 = (resolve, reject) => {
    resolve('第一步完成');
}

const step2 = (resolve, reject) => {
    resolve('第二步完成');
}

const step3 = (resolve, reject) => {
    resolve('第三步完成');
}

new Promise(step1).then((val) => {
    console.log(val);
    return new Promise(step2);
}).then((val) => {
    console.log(val);
    return new Promise(step3);
}).then((val) => {
    console.log(val);
});