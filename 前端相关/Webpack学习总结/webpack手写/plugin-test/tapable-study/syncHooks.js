const {SyncHook, AsyncParallelHook} = require('tapable');

// 创建类

class DemoHooks {
    constructor() {
        this.hooks = {
            mySyncHook: new SyncHook(['name', 'age']),
            myAsyncHook: new AsyncParallelHook(['name', 'age'])
        };
    }
}

// 实例化
const myDemoHook = new DemoHooks();

// 绑定同步钩子
myDemoHook.hooks.mySyncHook.tap('sync-event', (name, age) => {
    console.log(`我是同步钩子函数${name}---${age}`);
});
// 绑定异步钩子
myDemoHook.hooks.myAsyncHook.tapPromise('async-event', (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`我是异步钩子函数${name}---${age}`);
            resolve();
        }, 1000);
    });
});

// 执行同步钩子函数
myDemoHook.hooks.mySyncHook.call('lisi', 12);
myDemoHook.hooks.myAsyncHook.promise('wangwu', 13).then(() => {
    console.log('异步钩子执行完毕');
}, err => {
    console.log('异步钩子执行出错', err);
});
