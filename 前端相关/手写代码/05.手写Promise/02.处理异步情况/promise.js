const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

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
        // 处理executor同步情况，如果状态是成功的时候
        if(this.status === FULFILLED) {
            onfulfilled(this.value);
        }
        // 处理executor同步情况，如果状态是失败的时候
        if(this.status === REJECTED) {
            onrejected(this.reason);
        }
        // 处理executor异步情况
        if(this.status === PENDING) {
            // 异步的情况，先把成功的回调和失败的回调分开存放
            // 先订阅
            this.resolveCallbacks.push(() => {
                onfulfilled(this.value);
            });
            this.rejectCallbacks.push(() => {
                onrejected(this.reason);
            });
        }
    }
}

module.exports = Promise;