class AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }
    // tapAsync(name, task) {
    //     this.tasks.push(task);
    // }
    // callAsync(...args) {
    //     const finalCallback = args.pop();
    //     let index = 0;
    //     const next = () => {
    //         if (this.tasks.length === index) return finalCallback();
    //         const task = this.tasks[index++];
    //         task(...args, next);
    //     }
    //     next();
    // }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        // 将promise串联起来
        const [first, ...other] = this.tasks;
        return other.reduce((p, n) => { // 类似redux源码
             return p.then(() => n(...args));
        }, first(...args));
    }
}
const hook = new AsyncSeriesHook(['name']);
// hook.tapAsync('react', (name, callback) => {
//     setTimeout(() => {
//         console.log('react', name);
//         callback();
//     }, 1000);
// });

// hook.tapAsync('node', (name, callback) => {
//     setTimeout(() => {
//         console.log('node', name);
//         callback();
//     }, 1000);
// });

// hook.tapAsync('webpack', (name, callback) => {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback();
//     }, 1000);
// });
hook.tapPromise('react', name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000);
    })
});

hook.tapPromise('node', name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    })
});

// hook.callAsync('tom', () => {
//     console.log('end');
// });
hook.promise('tom').then(() => {
    console.log('end');
});