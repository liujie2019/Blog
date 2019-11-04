const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class Promise {
    constructor(executor) {
        this.status = PENDING; // 默认当前状态是等待态
        this.value; // 成功后的返回值
        this.reason; // 失败的原因
        // 表示成功的函数
        const resolve = value => {
            // 只有是等待态的时候，才能更改状态
            // 因为Promise状态一旦改变，就不能再发生变化
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
            }
        }
        // 表示失败的函数
        const reject = reason => {
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
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
        // 如果状态是成功的时候
        if(this.status === FULFILLED) {
            onfulfilled(this.value);
        }
        if(this.status === REJECTED) {
            onrejected(this.reason);
        }
    }
}

module.exports = Promise;