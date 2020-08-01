function handleFetchQueue(urls, max, callback) {
    const urlsCount = urls.length;
    const res = []; // 结果数组
    const requestQueue = []; // 请求队列
    let i = 0;
    function fetch(url) {
        return new Promise((resolve, reject) => {
            const time = Math.round(Math.random() * 1e4);
            console.log(`start request ${url}`);
            setTimeout(() => {
                resolve(url);
                console.log(`end request ${url}`);
            }, time);
        });
    }
    function handleRequest(url) {
        const req = fetch(url).then(data => {
            res.push(data);
        }).catch(err => {
            res.push(err);
        }).finally(() => {
            // 不管请求成功还是失败都算一次请求，都要从请求队列中去掉一次请求记录
            if (res.length < urlsCount && i < urlsCount) {
                // 每次请求完成一次，就可以重新发起一个请求
                requestQueue.shift();
                handleRequest(urls[i++]);
            } else if (res.length === urlsCount) {
                typeof callback === 'function' && callback();
            }
        });
        // 如果请求队列中请求小于最大值
        // push方法返回值为数组的长度
        let len = requestQueue.push(req);
        if (len < max) {
            handleRequest(urls[i++]);
        }
    }
    handleRequest(urls[i++]);
}

// 假设有15个请求，最高并发为10
const urls = Array.from({length: 15}, (item, index) => index);

handleFetchQueue(urls, 10, () => {
    console.log('run callback');
});
