function handleRequest(urls, limit, cb) {
    let res = [];
    let i = 0;
    let requestQueue = [];

    function fetch(url) {
        return new Promise((resolve, reject) => {
            let time = Math.floor(Math.random() * 10e3);
            console.log(`start url ${url}`);
            setTimeout(() => {
                let random = Math.random();
                if (random > 0.5) {
                    resolve();
                } else {
                    reject('出错了');
                }
                console.log(`end url ${url}`);
            }, time);
        });
    }
    function request(url) {
        const req = fetch(url).then(data => {
            res.push(data);
        }).catch(err => {
            res.push(err);
        }).finally(() => {
            if (res.length < urls.length && i < urls.length) {
                requestQueue.shift(); // 出队
                request(urls[i++]);
            } else if (res.length === urls.length) {
                typeof cb === 'function' && cb();
            }
        });

        let len = requestQueue.push(req);
        if (len < limit) {
            request(urls[i++]);
        }
    }
    request(urls[i++]);
}

const urls = Array.from({length: 15}, (k, v) => v + 1);

handleRequest(urls, limit = 10, () => {
    console.log('done');
});