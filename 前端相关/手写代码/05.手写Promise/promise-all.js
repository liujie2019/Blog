Promise.all = promiseArr => {
    return new Promise((resolve, reject) => {
        const resArr = [];
        let count = 0;
        function processData(index, data) {
            resArr[index] = data;
            count++;
            if (count === promiseArr.length) {
                resolve(resArr);
            }
        }
        for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(data => {
                processData(i, data);
            }, reject); // 有一个失败了就走reject
        }
    });
};