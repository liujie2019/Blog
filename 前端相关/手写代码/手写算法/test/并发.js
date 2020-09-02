function fetch(url) {
    let time = Math.floor(Math.random() * 10e3);
    return new Promise((resolve, reject) => {
        console.log(`start url ${url}`);
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve();
            } else {
                reject();
            }
            console.log(`end url ${url}`);
        }, time);
    });
}

function handleFetchQueue(urls, max, cb) {
    let res = []; // 结果数组
    let count = 0; // 请求计数
    let len = urls.length;
    let requestQueue = []; // 请求队列
    function request(url) {
        const req = fetch(url).then(data => {
            res.push(data);
        }).catch(err => {
            res.push(err);
        }).finally(() => {
            if (count < len && res.length < len) {
                requestQueue.shift();
                request(urls[count++]);
            } else if (res.length === len) {
                typeof cb === 'function' && cb();
            }
        });
        let queueLen = requestQueue.push(req);
        if (queueLen < max) {
            request(urls[count++]);
        }
    }
    request(urls[count++]);
}

const urls = Array.from({length: 15}, (k, v) => v + 1);

handleFetchQueue(urls, max = 10, () => {
    console.log('done');
});