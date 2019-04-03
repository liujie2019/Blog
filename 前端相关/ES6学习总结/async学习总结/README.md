[TOC]
`async`函数是`Generator`函数的语法糖。使用关键字`async`来表示，在函数内部使用`await`来表示异步。相较于 Generator，async 函数的改进在于下面四点：

1. **内置执行器**：Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，调用方式跟普通函数的调用一样；
2. **更好的语义**：async 和 await 相较于 * 和 yield更加语义化；
3. **更广的适用性**：co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值(Number，string，boolean，但这时等同于同步操作)；
4. **返回值是 Promise**：async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 `then()` 方法进行调用。
5. **代码逻辑更清晰**：async/await 的优势在于能更好的处理then链，特别是有多个 Promise 组成的 then 链的时候，优势就体现出来了。

>async是ES7新出的特性，表明当前函数是异步函数，不会阻塞线程导致后续代码停止运行。

```
const asyncFn = async () => {
    return '我后执行'
}
asyncFn().then(result => {
    console.log(result);
})
console.log('我先执行');
// 运行结果：
我先执行
我后执行
```
>虽然是上面asyncFn()先执行，但是已经被定义异步函数了，不会影响后续函数的执行。

### async 和 await
先从字面意思来理解，`async` 是异步的简写，而`await`可以认为是 `async wait` 的简写。所以应该很好理解 async 用于申明一个函数(function)是异步的，而`await`用于等待一个异步方法执行完成。

### async-await和Promise的关系
async-await是promise和generator的语法糖。只是为了让我们书写代码时更加流畅，当然也增强了代码的可读性。简单来说：async-await 是建立在 promise机制之上的，并不能取代其地位。
### 基本语法
```js
async function fn() {
 	// await会把结果转化为一个Promise对象
    const result = await Math.random();
    console.log(result);
}

fn();
```
#### async
async用来表示函数是异步的，定义的函数会返回一个Promise对象，可以使用then方法添加回调函数。

```js
async function demo1(params) {
    return 'demo1';
}

demo1().then(val => {
    console.log(val); // 'demo1'
});
```
若 async 定义的函数有返回值，return 123;相当于Promise.resolve(123),没有声明式的 return则相当于执行了Promise.resolve();

#### await
await 可以理解为是 `async wait`(异步等待)的简写。await关键字只能出现在 async 函数内部，不能单独使用。任何async函数都会默认返回promise，并且这个promise解析的值都将会是这个函数的返回值，而async函数必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变。

```

```
await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是它最主要的意图是用来等待 Promise 对象的状态被 resolved。如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决,如果等的是正常的表达式则立即执行。

### Async 函数的错误处理
```
let a;

const testFn = async () => {
    await Promise.reject('error');
    a = await 1; // 这行代码不会被执行
}

testFn().then(v => console.log(a));
```
>如上面代码所示：当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。解决办法：可以添加 try/catch。

```
let a;

const testFn = async () => {
    try {
        await Promise.reject('error');
    } catch (error) {
        console.error(error);
    }
    a = await 1;
}

testFn().then(v => console.log(a));
```
```
const testError = async () => {
    throw new Error('has Error');
}
testError()
    .then(success => console.log('成功', success))
    .catch(error => console.log('失败', error)); // 失败 Error: has Error
```

### demo
```
// demo1
const axios = require('axios');

const getZhihuColumn = async (id) => {
	// 获取知乎小管家的专栏信息
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await axios({
        url: url,
        method: 'GET'
    });
    console.log(`Name: ${response.data.name}`);
    console.log(`Intro: ${response.data.intro}`);
}

getZhihuColumn('zhihuadmin');
```
```
// demo2
// 将函数的结果做为一个Promise返回
const axios = require('axios');

const getZhihuColumn = async (id) => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    return await axios({
        url: url,
        method: 'GET'
    });
}

getZhihuColumn('zhihuadmin')
    .then(response => {
        console.log(`Name: ${response.data.name}`);
        console.log(`Intro: ${response.data.intro}`);
    });
```
```
// demo3
const axios = require('axios');

class ApiClient {
    // 将class中的函数定义成async风格
    async getZhihuColumn(id) {
        const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
        return await axios({
            url: url,
            method: 'GET'
        });
    }
}
// 将立即执行函数定义为async风格
(async () => {
    const client = new ApiClient();
    client.getZhihuColumn('zhihuadmin')
        .then(response => {
            console.log(`Name: ${response.data.name}`);
            console.log(`Intro: ${response.data.intro}`);
            console.log(`Description: ${response.data.description}`)
        });
})();
```
```
const axios = require('axios');

const getZhihuColumn = async (id) => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await axios({
        url: url,
        method: 'GET'
    });
    console.log(response.status, response.statusText); // 200 'OK'
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return await response;
}

// 处理async函数中的错误
const showColunmInfo = async (id) => {
    try {
        const response = await getZhihuColumn(id);
        console.log(`Name: ${response.data.name}`);
        console.log(`Intro: ${response.data.intro}`);
    } catch (err) {
        console.error(err);
    }
}

showColunmInfo('zhihuadmin11');
```
```
const axios = require('axios');

const sleep = (timeout = 2000) => new Promise(resolve => {
    setTimeout(resolve, timeout);
});

const getZhihuColumn = async (id) => {
    await sleep(3000);
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    return await axios({
        url: url,
        method: 'GET'
    });
}

// 正确处理多个await操作的串行
const showColumnInfo = async () => {
    console.time('showColumnInfo');
    const feweekly = await getZhihuColumn('feweekly');
    const response = await getZhihuColumn('zhihuadmin');

    console.log(`NAME: ${feweekly.data.name}`);
    console.log(`INTRO: ${feweekly.data.intro}`);

    console.log(`NAME: ${response.data.name}`);
    console.log(`INTRO: ${response.data.intro}`);
    console.timeEnd('showColumnInfo');
}

showColumnInfo();
// 运行结果：
NAME: 前端周刊
INTRO: 在前端领域跟上时代的脚步，广度和深度不断精进
NAME: 知乎小管家说
INTRO: 知乎社区管理团队官方专栏，不定期更新社区管理工作…
showColumnInfo: 6653.686ms
```
```
const axios = require('axios');

const getZhihuColumn = async (id) => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    return await axios({
        url: url,
        method: 'GET'
    });
}

// 使用 Promise.all() 让多个 await 操作并行
const showColumnInfo = async () => {
    console.time('showColumnInfo');
    const [feweekly, response] = await Promise.all([
        getZhihuColumn('feweekly'),
        getZhihuColumn('zhihuadmin')
    ]);

    console.log(`NAME: ${feweekly.data.name}`);
    console.log(`INTRO: ${feweekly.data.intro}`);

    console.log(`NAME: ${response.data.name}`);
    console.log(`INTRO: ${response.data.intro}`);
    console.timeEnd('showColumnInfo');
}

showColumnInfo();
// 运行结果：
NAME: 前端周刊
INTRO: 在前端领域跟上时代的脚步，广度和深度不断精进
NAME: 知乎小管家说
INTRO: 知乎社区管理团队官方专栏，不定期更新社区管理工作…
showColumnInfo: 412.075ms
```
#### bluebird使用
```
const bluebird = require('bluebird');

//结合 await 和任意兼容 .then() 的代码
const main = async () => {
  console.log('waiting...');
  await bluebird.delay(2000);
  console.log('done!');
}

main();
```
```
const axios = require('axios');
const bluebird = require('bluebird');

const getZhihuColumn = async (id) => {
  await bluebird.delay(1000);
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  return await axios({
      url: url,
      method: 'GET'
  });
}

const showColumnInfo = async () => {
  console.time('showColumnInfo');

  const names = ['feweekly', 'zhihuadmin'];
  const promises = names.map(x => getZhihuColumn(x));

  //在 for 循环中正确的使用 await
  for (const promise of promises) {
    const column = await promise;
    console.log(`Name: ${column.data.name}`);
    console.log(`Intro: ${column.data.intro}`);
  }

  console.timeEnd('showColumnInfo');
};

showColumnInfo();
// 运行结果：
Name: 前端周刊
Intro: 在前端领域跟上时代的脚步，广度和深度不断精进
Name: 知乎小管家说
Intro: 知乎社区管理团队官方专栏，不定期更新社区管理工作…
showColumnInfo: 1750.034ms
```
```
const sleep = (time = 100) => new Promise(resolve => {
    setTimeout(resolve(time + 200), timeout);
});

const step1 = async (time) => {
    console.log(`step1 with ${time}`);
    return sleep(time);
}

const step2 = async (time) => {
    console.log(`step2 with ${time}`);
    return sleep(time);
}

const step3 = async (time) => {
    console.log(`step3 with ${time}`);
    return sleep(time);
}

function test() {
    console.log('test start');
    console.time('test');
    const time1 = 500;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step2(time3))
        .then(res => {
            console.log(`result is ${res}`);
            console.timeEnd('test');
        });
}

test();
// 运行结果：
test start
step1 with 500
step2 with 700
step2 with 900
result is 1100
test: 3.451ms
```
```
const sleep = (time = 100) => new Promise(resolve => {
    setTimeout(resolve(time + 200), timeout);
});

const step1 = async (time) => {
    console.log(`step1 with ${time}`);
    return sleep(time);
}

const step2 = async (time) => {
    console.log(`step2 with ${time}`);
    return sleep(time);
}

const step3 = async (time) => {
    console.log(`step3 with ${time}`);
    return sleep(time);
}
// async和await方式更加清晰
const test = async () => {
    console.log('test start111');
    console.time('test');
    const time1 = 500;
    const time2 = await step1(time1);
    const time3 = await step1(time2);
    const res = await step1(time3);
    console.log(`result is ${res}`);
    console.timeEnd('test');
}

test();
```
### 参考文档
1. [理解 async/await](https://segmentfault.com/a/1190000010244279)
2. [ES6系列文章 异步神器async-await](https://segmentfault.com/a/1190000011526612)
3. [一次性让你懂async/await，解决回调地狱](https://juejin.im/post/5b1ffff96fb9a01e345ba704)
4. [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)