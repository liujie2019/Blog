const {AsyncSeriesBailHook} = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅钩子
            arch: new AsyncSeriesBailHook(['name'])
        }
    }
    start() {
        this.hooks.arch.promise('tom').then(data => {
            console.log(data);
        }, error => {
            console.log('error：', error); // 停止学习了
        });
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
                    reject('停止学习了');
                }, 1000);
            })
        });
        this.hooks.arch.tapPromise('vue', name => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('vue', name);
                    resolve();
                }, 1000);
            })
        });
    }
}

let l = new Lesson();
l.tap(); // 注册两个监听函数
l.start(); // 启动钩子
/**
webpack tom
node tom
error： 停止学习了
*/