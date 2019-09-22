const {SyncWaterfallHook} = require('tapable'); // 解构同步勾子

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅勾子
            // waterfall 瀑布
            arch: new SyncWaterfallHook(['name', 'age'])
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
            return 'node学的不错'; // return返回值是传递给下一个监听函数的数据
        });
        this.hooks.arch.tap('vue', data => {
            console.log('vue', data); // vue node学的不错
        });
    }
}

const l = new Lesson();
console.log(l.hooks.arch);
l.tap(); // 注册监听函数
console.log(l.hooks.arch.taps);
l.start(); // 启动钩子