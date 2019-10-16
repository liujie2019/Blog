const {AsyncParallelHook} = require('tapable'); // 解构异步钩子
// 异步tapAsync注册
class Lesson {
    constructor() {
        this.hooks = {
            // 订阅钩子
            arch: new AsyncParallelHook(['name'])
        }
    }
    start() {
        this.hooks.arch.callAsync('tom', () => {
            console.log('end');
        });
    }
    tap() {
        // tapAsync异步订阅
        this.hooks.arch.tapAsync('webpack', (name, callback) => {
            setTimeout(() => {
                console.log('webpack', name);
                callback();
            }, 1000);
        });
        this.hooks.arch.tapAsync('node', (name, callback) => {
            setTimeout(() => {
                console.log('node', name);
                callback();
            }, 1000);
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