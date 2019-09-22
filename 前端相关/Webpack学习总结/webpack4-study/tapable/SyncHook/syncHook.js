// SyncHook实现
class SyncHook {
    constructor() {
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    call(...args) {
        this.tasks.forEach(task => task(...args));
    }
}

const hook = new SyncHook(['name', 'age']);
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
});
hook.tap('node', (name, age) => {
    console.log('node', `${name}--${age}`);
});

hook.call('lisi', 12);