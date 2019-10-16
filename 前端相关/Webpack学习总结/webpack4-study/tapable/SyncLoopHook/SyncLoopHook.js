// SyncLoopHook实现
class SyncLoopHook { // 同步钩子-瀑布
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
        this.tasks.forEach(task => {
            let res; // res为当前监听函数的返回值
            // 当该返回值不为undefined时继续执行
            do {
                res = task(...args);
            } while (res !== undefined);
        });
    }
}

const hook = new SyncLoopHook(['name', 'age']);
let total = 0;
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
    return ++total === 3 ? undefined : '继续学';
});
hook.tap('node', name => {
    console.log('node', name);
});
hook.tap('vue', name => {
    console.log('vue', name);
});

hook.call('tom', 12);
/**
执行结果：
webpack tom--12
webpack tom--12
webpack tom--12
node tom
vue tom
*/