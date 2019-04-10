[TOC]

#### Promise.all()批量执行

* Promise.all([p1, p2, p3, …])用于将多个`Promise`实例，包装成一个新的`Promise`实例。
* 返回的实例就是普通`Promise`。
* 接收一个数组作为参数。
* 数组里可以是`Promise`对象，也可以是别的值，只有`Promise`会等待状态改变。
* 当所有子`Promise`都完成，该`Promise`完成，返回值是全部值的数组。
* 有任何一个失败，该`Promise`失败，返回值是第一个失败的子`Promise`的结果。

```js
// 使用`Promise.all()`包装多个Promise实例

console.log('here we go');
Promise.all([1, 2, 3])
    .then(all => {
        console.log('1：', all);
        return Promise.all([function() {
            console.log('ooxx');
        }, 'xxoo', false]);
    })
    .then(all => {
        console.log('2：', all);
        let p1 = new Promise(resolve => {
            setTimeout(() => {
                resolve('I\'m P1');
            }, 1500);
        });
        let p2 = new Promise((resolve) => {
            setTimeout(() => {
                resolve('I\'m P2');
            }, 1450);
        });
        return Promise.all([p1, p2]);
    })
    .then(all => {
        console.log('2：', all);
        let p1 = new Promise(resolve => {
            setTimeout(() => {
                resolve('I\'m P1');
            }, 1500);
        });
        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('I\'m P2');
            }, 1000);
        });
        let p3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('I\'m P3');
            }, 3000);
        });
        return Promise.all([p1, p2, p3]);
    })
    .then(all => {
        console.log('all', all);
    })
    .catch(err => {
        console.log('Catch：', err);
    });
```
>结果：
```js
here we go
1： [ 1, 2, 3 ]
2： [ [Function], 'xxoo', false ]
2： [ 'I\'m P1', 'I\'m P2' ]
Catch： I'm P2 // 返回的是第一个失败的结果
```

##### Promise.all()与.map连用
Promise.all()最常见的就是和.map()一起使用。
```js
// 遍历目录，找出最大的一个文件-通过Promise.all()和.map()

const fs = require('fs');
const path = require('path');
const FileSystem = require('./FileSystem');

function findLargest(dir) {
    return FileSystem.readDir(dir, 'utf-8')
        .then( files => {
            return Promise.all( files.map( file => {
                return new Promise (resolve => {
                    fs.stat(path.join(dir, file), (err, stat) => {
                        if (err) throw err;
                        if (stat.isDirectory()) {
                            return resolve({
                                size: 0
                            });
                        }
                        stat.file = file;
                        resolve(stat);
                    });
                });
            }));
        })
        .then( stats => {
            let biggest = stats.reduce( (memo, stat) => {
                if(memo.size < stat.size) {
                    return stat;
                }
                return memo;
            });
            return biggest.file;
        })
}
```
#### 实现队列
##### 1. forEach()
```js
function queue(things) {
  let promise = Promise.resolve();
  things.forEach(thing => {
    promise = promise.then(() => {
      return new Promise(resolve => {
        doThing(thing, () => {
          resolve();
        });
      });
    });
  });
  return promise;
}
queue(['lots', 'of', 'things', ....]);
```
>常见错误：没有把`.then()`产生的新的`Promise`实例赋给`then`，没有生成队列。

##### 2. reduce()数组的一端遍历到另一端。
```js
function queue(things) {
  return things.reduce((promise, things) => {
    return promise.then(() => {
      return new Promise(resolve => {
        doThing(thing, () => {
          resolve();
        });
      });
    });
  }), Promise.resolve();
}
queue(['lots', 'of', 'things', ....]);
```
>常见错误：`Promise`实例创建之后，会立刻执行执行器代码，所以这个也无法达成队列的效果。

#### Promise.resolve()
`Promise.resolve()`返回一个`fulfilled`的`Promise`实例，或原始`Promise`实例。

* 参数为空，返回一个状态为`fulfilled`的`Promise`实例；
* 参数是一个跟`Promise`无关的值，同上，不过`fulfilled`响应函数会得到这个参数；
* 参数为`Promise`实例，则返回该实例，不做任何修改；
* 参数为`thenable`，立刻执行它的`.then()`函数。

```js
// Promise.resolve()

console.log('start');
Promise.resolve()
    .then((value) => {
        console.log('Step 1', value);
        return Promise.resolve('Hello');
    })
    .then(value => {
        console.log(value + ' World');
        return Promise.resolve(new Promise(resolve => {
            setTimeout(() => {
                resolve('Good');
            }, 2000);
        }));
    })
    .then(value => {
        console.log(value + ' evening');
        return Promise.resolve({
            then() {
                console.log(', everyone');
            }
        })
    });
```
>结果：
```js
start
Step 1 undefined
Hello World
Good evening
, everyone
```

#### Promise.reject()
`Promise.reject()`返回一个`rejected`的`Promise`实例，或原始`Promise`实例。

* 参数为空，返回一个状态为`rejected`的`Promise`实例；
* 参数是一个跟`Promise`无关的值，同上，不过`rejected`响应函数会得到这个参数；
* 参数为`Promise`实例，则返回该实例，不做任何修改；
* 与`Promise.resolve`相比，不认`thenable`。

```js
// Promise.reject()

let promise = Promise.reject('something wrong');
promise
    .then(() => {
        console.log('it\'s ok');
    })
    .catch(() => {
        console.log('no, it\'s not ok'); // 会输出
        return Promise.reject({
            then() {
                console.log('it will be ok');
            },
            catch() {
                console.log('not yet');
            }
        });
    });
```
#### Promise.race()
类似`Promise.all()`，区别在于它有任意一个完成就算完成。

>常见用法：

1. 把异步操作和定时器放在一起；
2. 如果定时器先触发，就认为超时，告知用户。

```js
// Promise.race()
console.log('start');
let p1 = new Promise(resolve => {
    // 这是一个长时间的调用
    setTimeout(() => {
        resolve('I\'m P1');
    }, 10000);
});
let p2 = new Promise(resolve => {
    // 这是个稍短的调用
    setTimeout(() => {
        resolve('I\'m P2');
    }, 2000)
});
Promise.race([p1, p2])
    .then(value => {
        console.log(value);
    });
```
>结果：
```js
start
I'm P2
```

#### 把回调包装成Promise
>好处：

* 可读性更好。
* 返回的结果可以加入任何Promise队列。

#### 把任何异步操作包装成Promise
>假设需求：

1. 用户点击按钮，弹出确认窗体。
2. 用户确认和取消有不同的处理。

```js
let confirm = popupManager.confirm('您确定么');
confirm.promise
  .then(() => {
    // do confirm staff
  })
  .catch(() => {
    // do cancel staff
  })

// 窗体的构造函数
class Confirm{
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.confirmButton.onClick = resolve;
      this.cancelButton.onclick = reject;
    })
  }
}
```

#### 其他
如果需要在IE使用Promise，有两个选择：

1. 只想实现异步队列：`jQuery.defered`；
2. 需要兼容所有平台：`Bluebird`、 `Promise polyfill`；

##### fetch api
`fetch api`是`XMLHttpRequest`的现代化替代方案。

1. 更强大，也更友好。
2. 直接返回一个Promise实例。

```js
// Fetch API

fetch('some.json')
    .then( response => {
        return response.json();
    })
    .then( json => {
        // do something with the json
    })
    .catch( err => {
        console.log(err);
    });
```
#### 异步函数
`async/await`：ES2017新增运算符，新的语言元素。

* 赋予`javascript`以顺序手法编写异步脚本的能力；
* 既保留异步运算的无阻塞特性，还继续使用同步写法；
* 还能正常使用`return/try/catch`；
* `async/await`仍然需要`Promise`。

```js
// async/await

function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function f1() {
    var x = await resolveAfter2Seconds(10);
    console.log(x); // 10
}
f1(); // 返回值也是Promise
```