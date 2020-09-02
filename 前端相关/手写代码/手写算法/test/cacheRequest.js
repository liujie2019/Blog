let res = {}; // 缓存请求结果

function fetch(url, sucCb, failCb) {
    let time = Math.floor(Math.random() * 10e3);
    if (Math.random() > 0.5) {
        setTimeout(() => {
            console.log(`${url}~成功`);
            sucCb('成功');
        }, time);
    } else {
        setTimeout(() => {
            console.log(`${url}~失败`);
            failCb('失败');
        }, time);
    }
}

function cacheRequest(url, suc, fail) {
    // 如果发送过相同请求
    if(res[url]) {
        const {status, data} = res[url];
        if (status === 'success') {
            suc(data);
        } else if (status === 'fail') {
            fail(data);
        } else {
            res[url].queue.push({suc, fail});
        }
    } else {
        res[url] = {
            status: '',
            data: '',
            queue: [] // 请求队列
        };
        fetch(url, data => {
            res[url].status = 'success';
            res[url].data = data;
            suc(data);
            if (res[url].queue.length) {
                res[url].queue.forEach(({suc}) => {
                    suc(data);
                });
                res[url].queue = [];
            }
        }, err => {
            res[url].status = 'fail';
            res[url].data = err;
            fail(err);
            if (res[url].queue.length) {
                res[url].queue.forEach(({fail}) => {
                    fail(err);
                });
                res[url].queue = [];
            }
        });
    }
}

cacheRequest('1.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
cacheRequest('1.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
cacheRequest('1.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
cacheRequest('1.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
cacheRequest('1.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
cacheRequest('2.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
cacheRequest('2.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
cacheRequest('3.com', data => {
    console.log(data);
}, err => {
    console.log(err);
});
