[TOC]
### 1. Promise是什么
`Promise`对象用于异步计算，一个`Promise`表示一个现在、将来或永不可能可用的值。

#### 1.1 Promise用途

* 主要用于异步计算；
* 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果；
* 可以在对象之间传递和操作`Promise`，帮助我们处理队列。

```js
new Promise(
	/*执行器 executor*/
	function (resolve, reject) {
		//一段耗时很长的异步操作
		resolve(); //数据处理完成
		reject(); //数据处理出错
	}
).then(function A() {
	// 成功，下一步
}, function B() {
	// 失败，做相应处理
});
```
状态响应函数可以返回新的Promise或其他值。如果返回新的Promise，那么下一级的`then()`会在新Promise状态改变之后执行。如果返回其它任何值，则会立刻执行下一级`then()`。

### 2. Promise产生的原因？
#### 2.1 异步操作的常见语法
##### 2.1.1 事件侦听与响应：
```js
// 事件侦听
document.getElementById('btn').addEventListener('click',cb, false);

function cb() {
    // 事件响应，进行相应的操作
}
```
##### 2.1.2 回调
```js
$.ajax('a.php', {
    success: function (res) {
        // 这里是回调函数
    }
});

// 在页面加载完成后回调
$(function() {
    // 这里也是回调函数
});
```



>浏览器中的`javascript`

1. 异步操作以事件为主。
2. 回调主要出现在`ajax`和`file api`

>`node.js`

1. 无阻塞高并发，是Node.js的招牌。
2. 异步操作是其保障。
3. 大量操作依赖回调函数。

>异步回调的问题：

![91d937f27cf21dc0595e11e5e47bd80c.png](evernotecid://AC85336C-B325-443E-8ED7-E6554790A944/appyinxiangcom/10797539/ENResource/p521)

>异步回调有四个问题：

* 嵌套层次很深，难以维护；
* 无法正常使用`return和throw`；
* 无法正常检索堆栈信息；
* 多个回调之间难以建立联系

#### Promise简介
```js
new Promise(
    // 执行器 executor
    function (resolve, reject) {
        // 一段耗时很长的异步操作
        resolve(); // 数据处理完成
        reject(); // 数据处理出错
    }
).then(
    function A() {
        // 成功，下一步
    },
    function B() {
        // 失败，做相应处理
    }
);
```

`Promise`是一个代理对象，它和原先要进行的操作并无关系；`Promise`通过引入一个回调，避免更多的回调。

`Promise`对象通过自身的状态，来控制异步操作。`Promise`有3个状态：

* pending：异步操作未完成；
* fulfilled：异步操作成功；
* rejected：异步操作失败；

需要注意：上面三种状态里面，`fulfilled和rejected`合在一起称为`resolved`（已定型），这三种的状态的变化途径只有两种。

1. 从“未完成”到“成功”；
2. 从“未完成”到“失败”。

>`Promise`状态发生改变，就会触发`.then()`里的响应函数处理后续步骤；`Promise`一旦状态发生变化，就凝固了，不会再有新的状态变化。这也是 `Promise`这个名字的由来，它的英语意思是“承诺”，一旦承诺成效，就不得再改变了。这也意味着，`Promise`实例的状态变化只可能发生一次。

因此，Promise 的最终结果只有两种。

* 异步操作成功，`Promise`实例传回一个值（`value`），状态变为`fulfilled`；
* 异步操作失败，`Promise`实例抛出一个错误（`error`），状态变为`rejected`。

![5f6d7fb8bd7987bd4a05e978457e30e0.png](evernotecid://AC85336C-B325-443E-8ED7-E6554790A944/appyinxiangcom/10797539/ENResource/p522)
>需要注意：每一个then都会返回一个新的Promise。

```js
console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  }).then(value => {
    console.log(value + ' world');
  });
```
>两步执行：
```js
console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
    resolve('hello');
    }, 2000);
    }).then(value => {
    console.log(value);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('world');
        }, 2000);
    });
}).then(value => { //两个then依次执行，value=上一个then的resolve的回调world
   console.log(value + ' world');
});
```
>结果如下：
```js
here we go
hello
world world
```
>Promise在队列中的应用：在任何地方生成了一个promise队列之后，我们可以把它作为一个变量传递到其他地方，如果我们的操作是队列的状态，即先进先出的状态，就可以在后面追加任意多的then，不管之前的队列是完成还是没有完成，队列都会按照顺序完成。

```js
console.log('start');

let promise = new Promise(resolve => {
    setTimeout(() => {
      // 1秒后输出
      console.log('the promise fulfilled');
      resolve('hello');
    }, 1000);
});
setTimeout(() => {
    promise.then(value => {
       console.log(value); // 3秒后输出
    });
});
```
>结果：
```js
start
the promise fulfilled
hello
```
>promise在then中不返回promise实例对象，将会执行下一步操作，即使返回值为false，false将会作为返回值传递到相应的then函数中。
```js
console.log('here we go');
new Promise(resolve => { // 执行1
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  })
    .then(value => {
      console.log(value);  // 执行2
      console.log('everyone');
      (function() { // 执行5。1、这段代码中没有返回新的值，下面一行返回的promise实际是在这个函数中返回的，不是在then的响应函数中返回的，then返回的promise实例就没有等待里面的这个promise完成。2、一直在等待执行，等最后的then返回之后，再执行这个函数。3、没有进入promise队列中，但是进程仍然是登它执行完成后才算是完成。
        return new Promise(resolve => { // 自己用自己的回调
          setTimeout(() => {
            console.log('mr');
            resolve('marry');
          }, 2000)
        });
      }());
      return false; // 执行3。1、false会直接传递到下一步，成为下一个then的value
      // 即使这里将return false;注销，默认也会返回Undefined
    })
    .then(value => { // 执行4
      console.log(value + 'world'); // value = false;
    })
```

#### .then()

* .then()接受两个函数作为参数，分别代表fulfilled和rejected；
* .then()返回一个新的Promise实例，所以它可以链式调用；
* 当前面的Promise状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行。
* 状态响应函数可以返回新的Promise或其他值；
* 如果返回新的Promise，那么下一级.then()会在新Promise状态改变之后执行；
* 如果返回其它任何值，则会立刻执行下一级.then()。

##### .then()的嵌套
因为`.then()`返回的还是Promise实例，外面的`.then()`会等里面的`.then()`执行完再执行。
```js
console.log('start');
new Promise( resolve => {
    console.log('Step 1');
    setTimeout(() => {
        resolve(100);
    }, 1000);
})
    .then(value => {
        console.log(value);
        return new Promise(resolve => {
            console.log('Step 1-1');
            setTimeout(() => {
                resolve(110);
            }, 1000);
        })
            .then( value => {
                console.log('Step 1-2');
                return value;
            })
            .then( value => {
                console.log('Step 1-3');
                return value;
            });
    })
    .then(value => {
        console.log(value);
        console.log('Step 2');
    });
```
>执行结果：
```js
start
Step 1
100
Step 1-1
Step 1-2
Step 1-3
110
Step 2
```

#### 错误处理
Promise会自动捕获内部异常，并交给`rejected`响应函数处理-catch捕获。
>推荐使用catch捕获
```js
console.log('here we go');
new Promise( resolve => {
    setTimeout( () => {
        throw new Error('bye');
    }, 2000);
})
    .then( value => {
        console.log( value + ' world');
    })
    .catch( error => {
        console.log( 'Error：', error.message);
    });
```
>Promise会自动捕获内部异常，并交给rejected响应函数处理-reject响应捕获：
```js
console.log('here we go');
new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('bye');
    }, 2000);
})
    .then(value => {
        console.log(value + ' world');
    }, error => {
        console.log('Error：', error);
    });
```
![729fb242d4cb7f7bf73b76bbb21cc190.png](evernotecid://AC85336C-B325-443E-8ED7-E6554790A944/appyinxiangcom/10797539/ENResource/p523)

##### catch和then连用
`catch`也会返回一个`promise`实例，如果没有抛出错误，也会是`fulfilled`状态，会执行后面的`then()`。
```js
console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
        resolve();
    }, 1000);
})
    .then(() => {
        console.log('start');
        throw new Error('test error');
    })
    .catch(err => {
        console.log('I catch：', err);
        // 下面这一行的注释将引发不同的走向
        // throw new Error('another error');
    })
    .then(() => {
        console.log('arrive here');
    })
    .then(() => {
        console.log('... and here');
    })
    .catch(err => {
        console.log('No, I catch：', err);
    });
```
>结果：`catch`中不抛出错误，后面的`then()`正常执行。
```js
here we go
start
I catch： Error: test error
    at Promise.then (/Users/liujie26/study/FE-study-notes/sources/css-test/promise-test/catch-then.js:9:15)
arrive here
... and here
```
>`catch`中抛出错误，后面的`then()`不执行。
```js
here we go
start
I catch： Error: test error
    at Promise.then (/Users/liujie26/study/FE-study-notes/sources/css-test/promise-test/catch-then.js:9:15)
No, I catch： Error: another error
    at Promise.then.catch.err (/Users/liujie26/study/FE-study-notes/sources/css-test/promise-test/catch-then.js:14:15)
```

>强烈建议在所有队列最后都加上`.catch()`，以避免漏掉错误处理造成意想不到的问题。

```js
doSomething()
  .doAnotherThing()
  .doMoreThing()
  .catch(err => {
    console.log(err);
  })
```