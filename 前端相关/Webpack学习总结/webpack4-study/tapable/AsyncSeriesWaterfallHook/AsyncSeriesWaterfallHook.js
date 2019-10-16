class AsyncSeriesWaterfallHook {
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        const finalCallback = args.pop();
        let index = 0;
        const next = (err, data) => {
            let task = this.tasks[index];
            // 如果task没有取到，则执行最后一个
            if(!task) return finalCallback();
            if (index === 0) {
                // 执行第一个
                task(...args, next);
            } else {
                task(data, next);
            }
            index++;
        }
        next(); // 先调一次
    }
    // tapPromise(name, task) {
    //     this.tasks.push(task);
    // }
    // promise(...args) {
    //     // 将promise串联起来
    //     const [first, ...other] = this.tasks;
    //     return other.reduce((p, n) => {
    //          return p.then(data => n(data));
    //     }, first(...args));
    // }
}

const hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('react', (name, callback) => {
    setTimeout(() => {
        console.log('react', name);
        callback(null, 'react学的不错喔');
    }, 1000)
});

hook.tapAsync('node', (data, callback) => {
    setTimeout(() => {
        console.log('node', data);
        callback(null, 'node学的不错喔');
    }, 1000)
});

hook.tapAsync('webpack', (data, callback) => {
    setTimeout(() => {
        console.log('webpack', data);
        callback();
    }, 1000)
});

// hook.tapPromise('react', name => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('react', name);
//             resolve('react学的不错喔');
//         }, 1000);
//     });
// })

// hook.tapPromise('node', data => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('node', data);
//             resolve();
//         }, 1000);
//     });
// });
hook.callAsync('tom', () => {
    console.log('end');
});
// hook.promise('tom').then(() => {
//     console.log('end');
// });