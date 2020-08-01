const {SyncHook, AsyncParallelHook} = require('tapable');

class Compiler {
    constructor(options) {
        this.hooks = {
            mySyncHook: new SyncHook(['name', 'age']),
            myAsyncHook: new AsyncParallelHook(['name', 'age'])
        };
        let plugins = options.plugins;
        if (plugins && plugins.length) {
            // 这里调用的是插件的apply方法来初始化插件，this指向complier实例
            plugins.forEach(plugin => plugin.apply(this));
        }
    }
    run() {
        console.log('开始编译了...');
        this.hooks.mySyncHook.call('lisi', 12);
        this.hooks.myAsyncHook.promise('wangwu', 13).then(() => {
            console.log('异步钩子执行完毕');
        }, err => {
            console.log('异步钩子执行出错', err);
        });
    }
}

class MyPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.mySyncHook.tap('sync-event', (name, age) => {
            console.log(`我是同步钩子函数${name}---${age}`);
        });
        compiler.hooks.myAsyncHook.tapPromise('async-event', (name, age) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`我是异步钩子函数${name}---${age}`);
                    resolve();
                }, 2000);
            });
        });
    }
}

const plugin = new MyPlugin();

const options = {
    plugins: [plugin]
};

// 初始化插件
const compiler = new Compiler(options);

compiler.run();