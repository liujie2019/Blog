let res = {};
function request(url, sucCb, failCb) {
    const time = Math.round(Math.random() * 1e4);
    if (Math.random() * 10 > 4) {
        setTimeout(() => {
            console.log(url + '~' + '成功');
            sucCb('成功了');
        }, time);
    } else {
        setTimeout(() => {
            console.log(url + '~' + '失败');
            failCb('失败了');
        }, time);
    }
}

function cacheRequest(url, suc, fail) {
    if (res[url]) { // 请求有缓存
        if (res[url].status === 'success') {
            suc(res[url].data);
        } else if (res[url].status === 'fail') {
            fail(res[url].data);
        } else { // 已请求，但未返回结果，将未执行函数放入队列
            res[url].queue.push({suc, fail});
        }
    } else {
        res[url] = {
            status: '',
            queue: [],
            data: ''
        };
        request(url, data => {
            res[url].status = 'success'; // 成功的回调做三件事情
            res[url].data = data;
            suc(data);
            // 任意一个请求回来之后，则清空对应请求的队列
            if (res[url].queue.length) {
                for (let i = 0; i < res[url].queue.length; i++) {
                    res[url].queue[i].suc(data);
                }
                res[url].queue = [];
            }
        }, err => {
            res[url].status = 'fail';
            res[url].data = err;
            fail(err);
            if (res[url].queue.length) {
                for (let i = 0; i < res[url].queue.length; i++) {
                    res[url].queue[i].fail(data);
                }
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
