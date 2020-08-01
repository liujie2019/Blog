function handleFetchQueue(urls, max, cb) {
    let urlsLen = urls.length;
    let res = []; // 结果数组
    const requestQueue = []; // 请求队列
    let i = 0; // url计数
    function fetch(url) {
        const time =  Math.round(Math.random() * 1e4);
        return new Promise((resolve, reject) => {
            console.log(`start ${url}`);
            setTimeout(() => {
                resolve();
                console.log(`end ${url}`);
            }, time);
        });
    }
    function handleRequest(url) {
        const req = fetch(url).then(data => {
            res.push(data);
        }).catch(err => {
            res.push(err); // 成功和失败都算
        }).finally(() => {
            // 判断结果数组的长度是否等于请求url的个数
            if (res.length < urlsLen && i < urlsLen) {
                requestQueue.shift();
                handleRequest(urls[i++]);
            } else if (res.length === urlsLen) {
                typeof cb === 'function' && cb();
            }
        });
        let len = requestQueue.push(req);
        if (len < max) {
            handleRequest(urls[i++]);
        }
    }
    handleRequest(urls[i++]);
}


const urls = Array.from({length: 15}, (item, index) => index);

handleFetchQueue(urls, 10, () => {
    console.log('run callback');
});