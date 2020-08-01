Promise.race = promiseArr => {
    for (let i = 0; i < promiseArr.length; i++) {
        Promise.resolve(promiseArr[i]).then(resolve, reject);
    }
};