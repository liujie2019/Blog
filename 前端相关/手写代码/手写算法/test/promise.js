class Promise {
    constructor (executor) {
        this.status = 'pending';
        this.value;
        this.reason;
        this.resolveCb = [];
        this.rejectCb = [];

        const resolve = value => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = value;
                this.resolveCb.forEach(cb => cb());
            }
        }
        const reject = reason => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.rejectCb.forEach(cb => cb());
            }
        }
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onResolved, onRejected) {
        if (this.status === 'resolved') {
            onResolved(this.value);
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
        // 处理异步的情况
        if (this.status === 'pending') {
            this.resolveCb.push(() => { // 先订阅
                onResolved(this.value);
            });
            this.rejectCb.push(() => {
                onRejected(this.reason);
            });
        }
    }

    static all(promiseArr) {
        return new Promise((resolve, reject) => {
            let res = [];
            let count = 0;
            for (let i = 0; i < promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then(data => {
                    res[i] = data;
                    count++;
                    if (count === promiseArr.length) {
                        resolve(res);
                    }
                }, err => {
                    reject(err);
                });
            }
        });
    }
    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i< promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                });
            }
        });
    }
    static promisify(fn) {
        return function(...args) {
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat((err, data) => err ? reject(err) : resolve(data)));
            });
        }
    }
}

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 1000);
    // reject('出错了');
}).then(data => {
    console.log(data);
}, err => {
    console.log(err);
});

module.exports = Promise;


Promise.all = function(promiseArr) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let len = promiseArr.length;
        let res = [];
        for (let i = 0; i < len; i++) {
            Promise.resolve(promiseArr[i]).then(data => {
                res[i] = data;
                count++;
                if (count === len) {
                    resolve(res);
                }
            }).catch(err => {
                reject(err);
            });
        }
    });
}