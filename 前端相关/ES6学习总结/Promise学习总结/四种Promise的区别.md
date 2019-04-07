```js
doSomething().then(function () {
  return doSomethingElse();
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);
```
>假设`doSomething`和`doSomethingElse`返回的都是一个`Promise`实例。
```js
// 问题一
doSomething()
    .then(function () {
        return doSomethingElse();
    })
    .then(finalHandler);

// 答案
doSomething
|-----------|
            doSomethingElse(undefined)
            |------------|
                         finalHandler(resultOfDoSomethingElse)
                         |------------|

// 问题二
doSomething()
    .then(function () {
        doSomethingElse();
    })
    .then(finalHandler);

// 答案
// 注意：doSomethingElse(undefined)和finalHandler(undefined)同时执行
doSomething
|------------------|
                   doSomethingElse(undefined)
                   |------------------|
                   finalHandler(undefined)
                   |------------------|


// 问题三
// 注意：doSomethingElse(undefined)和doSomething()同时执行
doSomething()
    .then(doSomethingElse())
    .then(finalHandler);

// 答案
doSomething
|------------------|
doSomethingElse(undefined)
|----------------------------------|
                   finalHandler(resultOfDoSomething)
                   |------------------|


// 问题四
doSomething()
    .then(doSomethingElse)
    .then(finalHandler);

// 答案
doSomething
|-----------|
            doSomethingElse(resultOfDoSomething)
            |------------|
                        finalHandler(resultOfDoSomethingElse)
                        |------------------|
```

### 参考文档
1. [[翻译] We have a problem with promises](http://fexteam.gz01.bdysite.com/blog/2015/07/we-have-a-problem-with-promises/)