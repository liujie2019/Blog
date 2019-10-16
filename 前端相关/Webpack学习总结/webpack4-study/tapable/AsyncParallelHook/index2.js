const {AsyncParallelHook} = require('tapable'); // 解构异步钩子
// 异步tapPromise注册
class Lesson {
    constructor() {
        this.hooks = {
            // 订阅钩子
            arch: new AsyncParallelHook(['name'])
        }
    }
    start() {
        this.hooks.arch.promise('tom').then(() => {
            console.log('end');
        })
    }
    tap() {
        // tapPromise异步订阅
        this.hooks.arch.tapPromise('webpack', name => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('webpack', name);
                    resolve();
                }, 1000);
            })
        });
        this.hooks.arch.tapPromise('node', name => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve();
                }, 1000);
            });
        });
    }
}

let l = new Lesson();
l.tap(); // 注册两个监听函数
l.start(); // 启动钩子
/**
执行结果：
webpack tom
node tom
end
*/