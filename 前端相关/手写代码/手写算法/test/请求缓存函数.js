let res = {}; // 存储请求结果

function request(url, sucCb, failCb) {
    let time = Math.floor(Math.random() * 1e4);
    if (Math.random() > 0.5) {
        setTimeout(() => {
            console.log(`${url}~成功了`);
            sucCb('成功了');
        }, time);
    } else {
        setTimeout(() => {
            console.log(`${url}~失败了`);
            failCb('失败了');
        }, time);
    }
}
/**
 *
 * @param  {any} url 请求路径
 * @param  {any} suc 请求成功的回调
 * @param  {any} fail 请求失败的回调
 * @return {void}
 */
function cacheRequest(url, suc, fail) {
    if (res[url]) { // 如果已经发送过相同请求，走缓存
        const {data, status} = res[url];
        if (status === 'success') {
            suc(data);
        } else if (status === 'fail') {
            fail(data);
        } else { // 已经请求，但没有返回结果，将成功和失败的回调都放入请求队列中
            res[url].queue.push({suc, fail});
        }
    } else {
        res[url] = {
            status: '', // 请求状态
            data: '', // 请求结果
            queue: []
        };
        request(url, data => {
            res[url].status = 'success';
            res[url].data = data;
            suc(data);
            if (res[url].queue.length) {
                res[url].queue.forEach(({suc}) => {
                    suc(url + '--' + data);
                });
                res[url].queue = [];
            }
        }, err => {
            res[url].status = 'fail';
            res[url].data = err;
            fail(err);
            if (res[url].queue.length) {
                res[url].queue.forEach(({fail}) => {
                    fail(url + '--' + err);
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