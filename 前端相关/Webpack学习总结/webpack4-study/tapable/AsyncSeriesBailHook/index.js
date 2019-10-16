const {AsyncSeriesBailHook} = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅钩子
            arch: new AsyncSeriesBailHook(['name'])
        }
    }
    start() {
        this.hooks.arch.callAsync('tom', data => {
            console.log(data);
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
                callback('停止学习'); // 后面的回调将不会执行
            }, 1000);
        });
        this.hooks.arch.tapAsync('vue', (name, callback) => {
            setTimeout(() => {
                console.log('vue', name);
                callback();
            }, 1000);
        });
    }
}

let l = new Lesson();
l.tap(); // 注册两个监听函数
l.start(); // 启动钩子
/**
webpack tom
node tom
停止学习
*/