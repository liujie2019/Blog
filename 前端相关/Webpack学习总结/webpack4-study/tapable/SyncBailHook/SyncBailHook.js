// SyncBailHook实现
class SyncBailHook {
    constructor() {
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    // 这里用函数剩余运算符接收若干个参数，将所有参数存入数组args中
    call(...args) {
        let res; // 当前回调函数的返回值
        let index = 0; // 当前要执行的回调函数索引值，默认从第一个开始
        // 至少要执行一个回调
        // 当前回调返回undefined且还有回调未执行的话再继续执行
        do {
            // 回调函数执行的时候，需要利用数组的展开运算符，将数组中的参数分别传递给订阅函数
            res = this.tasks[index++](...args);
        } while (res === undefined && this.tasks.length > index);
    }
}

const hook = new SyncBailHook(['name', 'age']);
// 这里虽然注册了两个回调，但是node回调不会执行
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
    return '停止学习';
});
hook.tap('node', (name, age) => {
    console.log('node', `${name}--${age}`);
});

hook.call('tom', 12);