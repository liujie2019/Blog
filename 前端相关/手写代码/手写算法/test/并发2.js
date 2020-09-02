
let urls = Array.from({length: 15}, (k, v) => v + 1);

function fetch(url) {
    let time = Math.floor(Math.random() * 10e3);
    return new Promise((resolve, reject) => {
        console.log(`start ${url}`);
        setTimeout(() => {
            if (Math.random() > 0.5) {
                console.log(`end ${url} success`);
                resolve();
            } else {
                console.log(`end ${url} fail`);
                reject();
            }
        }, time);
    });
}

function handleFetchQueue(urls, limit, cb) {
    let len = urls.length;
    let res = [];
    let count = 0; // 请求计数
    let requestQueue = [];

    function request(url) {
        const req = fetch(url).then(data => {
            res.push(data);
        }).catch(err => {
            res.push(err);
        }).finally(() => {
            if (res.length < len && count < len) {
                requestQueue.shift();
                request(urls[count++]);
            } else if (res.length === len) {
                typeof cb === 'function' && cb();
            }
        });
        if (requestQueue.push(req) < limit) {
            request(urls[count++]);
        }
    }

    request(urls[count++]);
}

handleFetchQueue(urls, limit = 10, () => {
    console.log('done');
});