// 实现一个函数来模拟请求
function resquest(url, suc, fail) {
    if (Math.random() * 10 > 4) {
        setTimeout(() => {
            console.log(url + '|' + 'suc');
            suc('sucess');
        }, Math.random() * 5 * 1000);
    } else {
        setTimeout(() => {
            console.log(url + '|' + 'fail');
            fail('fail');
        }, Math.random() * 5 * 1000);
    }
}

let objArr = {};
function cacheRequest(url, sucCb, failCb) {
    if (objArr[url]) { // 已经请求过，直接返回结果
        if (objArr[url].status === 'suc') { // 请求过，并成功
            sucCb(objArr[url].data);
        } else if (objArr[url].status === 'fail') { // 请求过，但失败
            failCb(objArr[url].data);
        } else { // 已请求，但未返回结果，将未执行函数放入队列
            if (objArr[url].queue && objArr[url].queue.length > 0) {
                objArr[url].queue.push({'suc': sucCb, 'fail': failCb});
            } else {
                objArr[url].queue = [{'suc': sucCb, 'fail': failCb}];
            }
        }
    } else {
        objArr[url] = {
            data: '',
            status: ''
        };
        resquest(url, data => {
            objArr[url].data = data;
            objArr[url].status = 'suc';
            sucCb(data);
            if (objArr[url].queue && objArr[url].queue.length > 0) { // 检测并处理队列中滞留的函数
                for (let i = 0; i < objArr[url].queue.length; i++) {
                    objArr[url].queue[i].suc(data);
                }
                objArr[url].queue = []; // 清空队列
            }
        }, err => {
            objArr[url].data = err;
            objArr[url].status = 'fail';
            failCb(err);
            if (objArr[url].queue && objArr[url].queue.length > 0) { // 检测并处理队列中滞留的函数
                for (let i = 0; i < objArr[url].queue.length; i++) {
                    objArr[url].queue[i].fail(err);
                }
                objArr[url].queue = []; // 清空队列
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
