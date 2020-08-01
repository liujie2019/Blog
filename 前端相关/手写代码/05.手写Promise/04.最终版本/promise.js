const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

// promise的处理函数
const resolvePromise = (promise2, x, resolve, reject) => {
    // 判断x的类型来决定是调用resovle还是reject
    if (promise2 === x) { // 循环引用
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 如果x是函数或者对象
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called; // // 默认没有调用
        try {
            let then = x.then;
            // 如果then是函数，说明x是一个promise
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    // y可能还是promise
                    // 如果成功的回调返回值还是pormise，就递归继续解析
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else { // x就是一个普通对象或函数，并没有then方法
                resolve(x);
            }
        } catch (error) { // 取then报错就抛出异常
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(error);
        }
    } else { // // x是普通值，直接传递给下一个then，常量直接抛出去即可
        resolve(x);
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING; // 默认当前状态是等待态
        this.value; // 成功后的返回值
        this.reason; // 失败的原因
        this.resolveCallbacks = []; // 存放成功回调函数数组
        this.rejectCallbacks = []; // 存放失败回调函数数组
        // 表示成功的函数
        const resolve = value => {
            // 只有是等待态的时候，才能更改状态
            // 因为Promise状态一旦改变，就不能再发生变化
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                // 依次执行resolveCallbacks中的回调函数
                this.resolveCallbacks.forEach(cb => cb()); // 发布
            }
        }
        // 表示失败的函数
        const reject = reason => {
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 依次执行rejectCallbacks中的回调函数
                this.rejectCallbacks.forEach(cb => cb()); // 发布
            }
        }
        // 这里可能会发生异常，处理throw new Error('失败了');的情况
        // 默认会调用执行函数
        try {
            executor(resolve, reject);
        } catch (error) {
            // 如果执行时报错了，等同于执行reject方法
            reject(error);
        }
    }
    then(onfulfilled, onrejected) { // 成功的回调和失败的回调
        // onfulfilled, onrejected是可选参数，没有指定的话，赋予默认值
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
        onrejected = typeof onrejected === 'function' ? onrejected : err => {throw err;};
        // 调用then后必须返回一个新的promise，规范里称为promise2
        let promise2;
        promise2 = new Promise((resolve, reject) => {
            // 处理executor同步情况，如果状态是成功的时候
            // 这里需要判断onfulfilled和onrejected的结果(规范里称为x)，如果是普通值则走promise2的成功(resolve)，但是该结果也有可能是新的Promise，因此这里需要做处理
            if(this.status === FULFILLED) {
                // 因为需要使用promise2，为了保证promise2存在，这里需要写成异步的形式
                setTimeout(() => {
                    try {
                        const x = onfulfilled(this.value);
                        // 这里的resolve, reject是promise2的
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        // 如果上一个Promise的onfulfilled函数执行报错，则直接走promise2的reject
                        reject(error);
                    }
                }, 0);
            }
            // 处理executor同步情况，如果状态是失败的时候
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            // 处理executor异步情况
            if(this.status === PENDING) {
                // 异步的情况，先把成功的回调和失败的回调分开存放
                // 先订阅
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onfulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onrejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }
    // catch其实就是没有成功的then
    catch(callback) {
        return this.then(null, callback);
    }
    // finally要放在最后
    finally(callback) {
        let P = this.constructor;
        return this.then(
            value  => P.resolve(callback()).then(() => value), // 成功的回调
            err => P.resolve(callback()).then(() => { throw err; }) // 失败的回调
        );
        // finally的作用是：不管前面的Promise是fulfilled还是rejected，都会执行回调函数callback。
    };

    // 类方法
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        });
    }
    static reject(error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            for(let i = 0; i < promiseArr.length; i++) {
                promiseArr[i].then(resolve, reject);
            };
        });
    }
    static all(promiseArr) {
        return new Promise((resolve, reject) => {
            let arr = [];
            let i = 0;
            function processData(index, data) {
                arr[index] = data;
                i++;
                if (i === promiseArr.length) {
                    resolve(arr);
                };
            };
            for(let i = 0; i < promiseArr.length; i++) {
                promiseArr[i].then(data => {
                    processData(i, data);
                }, reject);
            };
        });
    }

    static promisify(fn) {
        return function() {
            const args = [...arguments];
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat((err, data) => err ? reject(err) : resolve(data)));
            });
        };
    }
}
// 测试promise用
Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;