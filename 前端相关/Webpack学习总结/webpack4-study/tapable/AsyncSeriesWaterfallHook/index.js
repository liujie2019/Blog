const {AsyncSeriesWaterfallHook} = require('tapable'); // 解构异步钩子
class Lesson {
    constructor() {
        this.hooks = {
            // 订阅钩子
            arch: new AsyncSeriesWaterfallHook(['name'])
        };
    }
    start() {
        // this.hooks.arch.callAsync('tom', () => {
        //     console.log('end');
        // });
        this.hooks.arch.promise('tom').then(() => {
            console.log('end');
        });
    }
    tap() { // 注册监听函数，订阅
        // this.hooks.arch.tapAsync('node', (name, callback) => {
        //     setTimeout(() => {
        //         console.log('node', name);
        //         // callback(null, 'node学的不错喔');
        //         callback('aaa', 'result'); // 如果第一个参数不是null，会直接跳过后面的钩子，直接走到最终的
        //     }, 1000);
        // });
        // this.hooks.arch.tapAsync('react', (data, callback) => {
        //     setTimeout(() => {
        //         console.log('react', data);
        //         callback();
        //     }, 1000);
        // });
        // 另一种订阅方式
        this.hooks.arch.tapPromise('node', name => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve();
                }, 1000);
            });
        });
        this.hooks.arch.tapPromise('react', name => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve();
                }, 1000);
            });
        });
    }
}
const l = new Lesson();
l.tap();
l.start();