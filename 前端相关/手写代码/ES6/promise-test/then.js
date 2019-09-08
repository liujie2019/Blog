function timeout(ms) {
    return new Promise((resolve, reject) => {
        // 'done'将作为setTimeout回调函数参数
        setTimeout(resolve, ms, 'done');
    });
}

timeout(1000).then((value) => {
    console.log(value);
});