/**
 * @class Promise
 * 使用箭头函数，this指向是函数定义时的this指向，而不是函数调用时的this指向
 */
class Promise {
    constructor(executor) {
        // 参数校验
        if (typeof executor !== 'function') {
            throw new TypeError(`Promise resolver ${executor} is not a function`);
        }
        this.initData();
        // 采用bind方法绑定this，使得this指向始终指向当前实例
        this.resovle = this.resovle.bind(this);
        this.reject = this.reject.bind(this);
        try {
            executor(this.resovle, this.reject);
        } catch(e) {
            this.reject(e);
        }
    }
    // 初始化值
    initData() {
        this.value = null; // 终值
        this.reason = null; // 拒因
        this.state = Promise.PENDING; // 初始状态是pending
        this.onFulfilledCallbacks = []; // 成功回调
        this.onRejectedCallbacks = []; // 失败回调
    }
    resovle(value) {
        // 成功后的一系列操作
        // 两个操作：1. promise状态的改变 2. 成功回调的执行
        if (this.state === Promise.PENDING) {
            this.state = Promise.FULFILLED;
            this.value = value;
            this.onFulfilledCallbacks.forEach(fn => fn(this.value));
        }
    }
    reject(reason) {
        // 失败后的一系列操作
        // 两个操作：1. promise状态的改变 2. 失败回调的执行
        if (this.state === Promise.PENDING) {
            this.state = Promise.REJECTED;
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => fn(this.reason));
        }
    }
    then(onFulfilled, onRejected) {
        // 参数校验
        if (typeof onFulfilled !== 'function') {
            onFulfilled = function(value) {
                return value;
            }
        }
        if (typeof onRejected !== 'function') {
            onRejected = function(reason) {
                throw reason;
            }
        }
        // 实现链式调用，且改变了后面then的值，必须通过新的实例
        let newPromise = new Promise((resolve, reject) => {
            if (this.state === Promise.FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolve(x);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            if (this.state === Promise.REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolve(x);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            if (this.state === Promise.PENDING) {
                this.onFulfilledCallbacks.push(value => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(value);
                            resolve(x);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.onRejectedCallbacks.push(reason => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(reason);
                            resolve(x);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        });
        // then方法最后return newPromise
        return newPromise;
    }
}

Promise.PENDING = 'pending';
Promise.FULFILLED = 'fulfilled';
Promise.REJECTED = 'rejected';

module.exports = Promise;