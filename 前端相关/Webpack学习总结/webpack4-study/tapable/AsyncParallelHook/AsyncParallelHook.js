class AsyncParallelHook { // 钩子是异步的
    constructor() {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        // 获取到最终的执行函数
        const finalCallback = args.pop();
        let index = 0;
        // 类似于promise.all的实现
        const done = () => {
            index++;
            if (index === this.tasks.length) {
                finalCallback();
            }
        };
        this.tasks.forEach(task => {
            // pop方法会修改原数组，所以这里的args已经把最后一个参数删掉
            // 每个task都会执行done方法，用来判断是否所有task都执行完毕
            task(...args, done);
        })
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        const tasks = this.tasks.map(task => {
            return task(...args);
        });
        return Promise.all(tasks);
    }
}

const hook = new AsyncParallelHook(['name']);
// hook.tapAsync('react', (name, callback) => {
//     setTimeout(() => {
//         console.log('react', name);
//         callback()
//     }, 1000)
// });

// hook.tapAsync('node', (name, callback) => {
//     setTimeout(() => {
//         console.log('node', name);
//         callback()
//     }, 1000)
// });

// hook.tapAsync('webpack', (name, callback) => {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback();
//     }, 1000);
// });

// hook.callAsync('lisi', () => {
//     console.log('end');
// });
hook.tapPromise('react', name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000);
    });
});

hook.tapPromise('node', name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    });
});
hook.promise('lisi').then(() => {
    console.log('end');
});
/**
执行结果
react lisi
node lisi
webpack lisi
end
*/