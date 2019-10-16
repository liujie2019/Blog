[TOC]
## tapable介绍
Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，Tapable有点类似于nodejs的events库，核心原理也是依赖于**发布-订阅模式**。
```js
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require('tapable');
```
`Webpack`中最核心的负责编译的`Compiler`和负责创建`bundles`的`Compilation`都是`Tapable`的实例。
>hooks概览

常用的钩子主要包含以下几种，分为同步和异步，异步又分为并发执行和串行执行，如下图：
![](./static/Tabable.png)
### 同步钩子
#### SyncHook
SyncHook不关心监听函数的返回值。
```bash
npm i tabable -D
```
>demo1.js：

```js
const {SyncHook} = require('tapable'); // 结构同步勾子

class Lesson {
    constructor() {
        this.hooks = {
            // 订阅勾子
            arch: new SyncHook(['name']) // 参数可选
        }
    }
    start() {
        this.hooks.arch.call('liujie');
    }
    tap() { // 注册监听函数
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name);
        });
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name);
        });
    }
}
let l = new Lesson();

l.tap();  // 注册两个事件
l.start(); // 启动钩子
```

>`case1.js`：SyncHook钩子实现。

```js
// SyncHook实现
class SyncHook {
    constructor() {
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    call(...args) {
        this.tasks.forEach(task => task(...args));
    }
}

const hook = new SyncHook(['name', 'age']);
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
});
hook.tap('node', (name, age) => {
    console.log('node', `${name}--${age}`);
});

hook.call('lisi', 12);
```
[返回目录](#目录)

#### SyncBailHook
SyncBailHook为钩子加个保险，当return返回不是undefine时就会停止。

>`demo2.js`：

```js
const {SyncBailHook} = require('tapable'); // 解构同步钩子

class Lesson {
    constructor () {
        this.hooks = {
            // 订阅勾子
            arch: new SyncBailHook(['name'])
        }
    }
    start() {
        // 发布
        this.hooks.arch.call('liujie');
    }
    tap() {   //  注册监听函数,订阅
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name);
            return '想停止学习';  // 会停止
            // return undefined; // 不会停止
        });
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name);
            // 没有return语句，默认是return undefined;
        });
    }
}

let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动勾子
```
`SyncBailHook`钩子实现：
```js
// SyncBailHook实现
class SyncBailHook {
    constructor() {
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    // 这里用函数剩余运算符接收若干个参数，将所有参数存入数组args中
    call(...args) {
        let res; // 当前回调函数的返回值
        let index = 0; // 当前要执行的回调函数索引值，默认从第一个开始
        // 至少要执行一个回调
        // 当前回调返回undefined且还有回调未执行的话再继续执行
        do {
            // 回调函数执行的时候，需要利用数组的展开运算符，将数组中的参数分别传递给
            res = this.tasks[index++](...args);
        } while (res === undefined && this.tasks.length > index);
    }
}

const hook = new SyncBailHook(['name', 'age']);
// 这里虽然注册了两个回调，但是node回调不会执行
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
    return '停止学习';
});
hook.tap('node', (name, age) => {
    console.log('node', `${name}--${age}`);
});

hook.call('lisi', 12);
```
[返回目录](#目录)
#### SyncWaterfallHook
SyncWaterfallHook钩子监听上一个函数的返回值并将该返回值传给下一个监听函数。

>demo3.js:

```js
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
l.tap(); // 注册监听函数
console.log(l.hooks.arch.taps);
l.start(); // 启动钩子
```
SyncWaterfallHook钩子实现：
```js
// SyncWaterfallHook实现
class SyncWaterfallHook { // 同步钩子-瀑布
    constructor() {
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    // 这里用函数剩余运算符接收若干个参数，将所有参数存入数组args中
    call(...args) {
        // 解构获取第一个task和其余剩余的task
        const [first, ...others] = this.tasks;
        const res = first(...args); // 第一个tash回调函数的返回值
        // reduce迭代
        // pre是前一个task的返回结果，cur是当前task
        others.reduce((pre, cur) => {
            return cur(pre);
        }, res);
    }
}

const hook = new SyncWaterfallHook(['name', 'age']);
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
    return 'webpack学的不错喔';
});
hook.tap('node', data => {
    console.log('node', data);
    return 'node学的不错喔';
});
hook.tap('vue', data => {
    console.log('vue', data);
});

hook.call('lisi', 12);
/**
执行结果：
webpack lisi--12
node webpack学的不错喔
vue node学的不错喔
*/
```
[返回目录](#目录)
#### SyncLoopHook
SyncLoopHook钩子当监听函数被触发的时候，如果该监听函数返回true时，这个监听函数会多次执行，如果返回undefined，则表示退出循环。

>`demo4.js`：

```js
const {SyncLoopHook} = require('tapable'); // 解构同步钩子
// 不返回undefined，会多次执行
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new SyncLoopHook(['name'])
        }
    }
    start() {
        // 发布
        this.hooks.arch.call('liujie');
    }
    tap() { // 注册监听函数,订阅
        this.hooks.arch.tap('node', name => {
            console.log('node', name);
            return ++this.index === 3 ? undefined : '继续学';
        });
        this.hooks.arch.tap('react', name => {
            console.log('react', name);
        });
    }
}
let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>SyncLoopHook钩子实现：

```js
// SyncLoopHook实现
class SyncLoopHook { // 同步钩子-瀑布
    constructor() {
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    // 这里用函数剩余运算符接收若干个参数，将所有参数存入数组args中
    call(...args) {
        this.tasks.forEach(task => {
            let res; // res为当前监听函数的返回值
            // 当该返回值不为undefined时继续执行
            do {
                res = task(...args);
            } while (res !== undefined);
        });
    }
}

const hook = new SyncLoopHook(['name', 'age']);
let total = 0;
hook.tap('webpack', (name, age) => {
    console.log('webpack', `${name}--${age}`);
    return ++total === 3 ? undefined : '继续学';
});
hook.tap('node', name => {
    console.log('node', name);
});
hook.tap('vue', name => {
    console.log('vue', name);
});

hook.call('lisi', 12);
/**
执行结果：
webpack lisi--12
webpack lisi--12
webpack lisi--12
node lisi
vue lisi
*/
```
[返回目录](#目录)
### 异步钩子
异步的钩子分为`串行`和`并行`两种，`并行`需要等待所有并发的异步事件执行完成后再执行回调。

>Tapable库中有三种注册方法：

1. 同步注册方法`tap`；
2. 异步注册方法`tapAsync(callback)`，有一个回调函数参数；
3. `tapPromise`，注册`promise`(异步)。

三种注册方法则对应三种方式的调用的：

1. call(同步调用)
2. callAsync（异步调用）
3. promise（异步）

#### AsyncParallelHook(异步并行)
`AsyncParallelHook`是异步并行的钩子：不关心监听函数的返回值。

>`demo5.js`：

```js
const {AsyncParallelHook} = require('tapable'); // 解构异步钩子
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new AsyncParallelHook(['name'])
        }
    }

    start() {
        // 发布callAsync
        // this.hooks.arch.callAsync('liujie', function () { // 所有异步钩子执行完才会执行
        //     console.log('end');
        // });
        // 另一种发布promise
        this.hooks.arch.promise('liujie').then(function () {
                console.log('end');
            }
        );
    }
    tap() {  // 注册监听函数,订阅
        // 注册tapAsync
        // this.hooks.arch.tapAsync('node',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('node', name);
        //         callback();
        //     }, 1000)
        // })
        // this.hooks.arch.tapAsync('react',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('react', name);
        //         callback();
        //     }, 1000)
        // })
        // 另一种订阅 tapPromise
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve();
                }, 1000);
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve();
                }, 1000);
            });
        });
    }
}
let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>AsyncParallelHook钩子实现：
```js
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
```
[返回目录](#目录)
#### AsyncParallelBailHook
`AsyncParallelBailHook`是一个带保险的异步回调钩子，只要监听函数的返回值不为`null`，就会忽略后面的监听函数执行，直接跳跃到`callAsync`等触发函数绑定的回调函数，然后执行这个被绑定的回调函数。使用和原理与`SyncBailHook`相似。

#### AsyncSeriesHook(异步串行)
`AsyncSeriesHook`钩子是`异步串行(`one by one)。

>`demo6.js`：

```js
const {AsyncSeriesHook} = require('tapable'); // 解构异步钩子
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new AsyncSeriesHook(['name'])
        }
    }

    start() {
        // 发布
        // this.hooks.arch.callAsync('liujie', function () {
        //     console.log('end');
        // })
        // 另一种发布
        this.hooks.arch.promise('liujie').then(function () {
                console.log('end');
            }
        )
    }

    tap() { //注册监听函数,订阅
        // this.hooks.arch.tapAsync('node',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('node', name)
        //         callback()
        //     }, 1000)
        // })
        // this.hooks.arch.tapAsync('react',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('react', name)
        //         callback()
        //     }, 1000)
        // })
        // 另一种订阅
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve();
                }, 1000);
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve();
                }, 1000);
            })
        })
    }
}

let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>`AsyncSeriesHook`钩子实现：

```js
class AsyncSeriesHook {
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }

    callAsync(...args) {
        const finalCallback = args.pop();
        let index = 0;
        const next = () => {
            if (this.tasks.length === index) return finalCallback();
            const task = this.tasks[index++];
            task(...args, next);
        }
        next();
    }

    promise(...args) {
        // 将promise串联起来
        let [first, ...other] = this.tasks;
        return other.reduce((p, n) => { // 类似redux源码
             return p.then(() => n(...args));
        }, first(...args));
    }
}

const hook = new AsyncSeriesHook(['name'])
// hook.tapAsync('react', function (name, callback) {
//     setTimeout(() => {
//         console.log('react', name);
//         callback();
//     }, 1000)
// })
//
// hook.tapAsync('node', function (name, callback) {
//     setTimeout(() => {
//         console.log('node', name);
//         callback()
//     }, 1000)
// })
//
// hook.tapAsync('webpack', function (name, callback) {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback()
//     }, 1000)
// })

hook.tapPromise('react', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000);
    })
})

hook.tapPromise('node', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    })
})

// hook.callAsync('liujie', function () {
//     console.log('end');
// })

hook.promise('liujie').then(function () {
    console.log('end');
})
```
[返回目录](#目录)
#### AsyncSeriesBailHook

#### AsyncSeriesWaterfallHook
上一个监听函数的中的`callback(err, data)`的第二个参数，可以作为下一个监听函数的参数。
>`demo7.js`：

```js
const {AsyncSeriesWaterfallHook} = require('tapable'); // 解构异步钩子
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            // 订阅钩子
            arch: new AsyncSeriesWaterfallHook(['name'])
        };
    }
    start() {
        // 发布
        this.hooks.arch.callAsync('liujie', function () {
            console.log('end');
        })
        // 另一种发布
        // this.hooks.arch.promise('may').then(function () {
        //         console.log('end');
        //     }
        // )
    }

    tap() { //  注册监听函数,订阅
        this.hooks.arch.tapAsync('node', (name, callback) => {
            setTimeout(() => {
                console.log('node', name);
                // callback(null, 'result')
                callback('error', 'result'); // 如果放error, 会跳过直接后面的钩子，直接走到最终的
            }, 1000);
        });
        this.hooks.arch.tapAsync('react', (name, callback) => {
            setTimeout(() => {
                console.log('react', name);
                callback();
            }, 1000);
        });
        // 另一种订阅
        // this.hooks.arch.tapPromise('node', (name) => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log('node', name)
        //             resolve()
        //         }, 1000)
        //     })
        // })
        // this.hooks.arch.tapPromise('react', (name) => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log('react', name)
        //             resolve()
        //         }, 1000)
        //     })
        // })
    }
}

let l = new Lesson();

l.tap();  //注册两个函数
l.start(); // 启动钩子
```
>`AsyncSeriesWaterfallHook`钩子实现：

```js
class AsyncSeriesWaterfallHook {
    constructor(args) {  // args => ['name']
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
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

    promise(...args) {
        // 将promise串联起来
        let [first, ...other] = this.tasks;
        return other.reduce((p, n) => {
             return p.then((data) => n(data));
        }, first(...args));
    }
}

let hook = new AsyncSeriesWaterfallHook(['name']);

// hook.tapAsync('react', function (name, callback) {
//     setTimeout(() => {
//         console.log('react', name);
//         callback(null, '结果1')
//     }, 1000)
// })
//
// hook.tapAsync('node', function (name, callback) {
//     setTimeout(() => {
//         console.log('node', name);
//         callback(null, '结果2')
//     }, 1000)
// })
//
// hook.tapAsync('webpack', function (name, callback) {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback()
//     }, 1000)
// })

hook.tapPromise('react', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve('result');
        }, 1000);
    });
})

hook.tapPromise('node', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    });
});
// hook.callAsync('liujie', function () {
//     console.log('end');
// })
hook.promise('liujie').then(function () {
    console.log('end');
})
```
[返回目录](#目录)

## 参考文档
1. [webpack4.0源码分析之Tapable](https://juejin.im/post/5abf33f16fb9a028e46ec352)
2. [webpack插件机制之Tapable](https://juejin.im/post/5abf33f16fb9a028e46ec352)
3. [webpack系列之二Tapable](https://juejin.im/post/5c25f920e51d45593b4bc719)
