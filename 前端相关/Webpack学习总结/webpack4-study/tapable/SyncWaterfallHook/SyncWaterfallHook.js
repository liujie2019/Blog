// SyncWaterfallHook实现
class SyncWaterfallHook { // 同步钩子-瀑布
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
        // 解构获取第一个task和其余剩余的task
        const [first, ...others] = this.tasks;
        const res = first(...args); // 第一个tash回调函数的返回值
        // reduce迭代
        // pre是前一个task的返回结果，cur是当前task
        others.reduce((pre, cur) => {
            return cur(pre);
        }, res);
    }
}

const hook = new SyncWaterfallHook(['name', 'age']);
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
    return 'webpack学的不错喔';
});
hook.tap('node', data => {
    console.log('node', data);
    return 'node学的不错喔';
});
hook.tap('vue', data => {
    console.log('vue', data);
});

hook.call('lisi', 12);
/**
执行结果：
webpack lisi--12
node webpack学的不错喔
vue node学的不错喔
*/