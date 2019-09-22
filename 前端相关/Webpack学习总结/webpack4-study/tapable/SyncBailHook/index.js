const {SyncBailHook} = require('tapable'); // 解构同步勾子

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅勾子
            arch: new SyncBailHook(['name', 'age'])
        }
    }
    start() {
        // 利用钩子的call方法调用监听函数
        this.hooks.arch.call('lisi', 12);
    }
    tap() {
        // 利用钩子的tap方法注册监听函数
        this.hooks.arch.tap('node', (name, age) => {
            console.log('node', `${name}-${age}`); // node lisi-12
            return '有点累，停止学习';
        });
        this.hooks.arch.tap('vue', name => {
            console.log('vue', name); // vue lisi
        });
    }
}

const l = new Lesson();
console.log(l.hooks.arch);
l.tap(); // 注册监听函数
console.log(l.hooks.arch.taps);
l.start(); // 启动钩子