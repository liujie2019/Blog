const {SyncHook} = require('tapable'); // 解构同步钩子

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅钩子
            arch: new SyncHook(['name', 'age'])
        }
    }
    start() {
        // 利用钩子的call方法调用监听函数
        this.hooks.arch.call('tom', 12);
    }
    tap() {
        // 利用钩子的tap方法注册监听函数
        this.hooks.arch.tap('node', (name, age) => {
            console.log('node', `${name}-${age}`); // node tom-12
        });
        this.hooks.arch.tap('vue', name => {
            console.log('vue', name); // vue tom
        });
    }
}

const l = new Lesson();
console.log(l.hooks.arch);
l.tap(); // 这里注册了两个监听函数
console.log(l.hooks.arch.taps);
l.start(); // 启动钩子