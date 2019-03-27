function _LazyMan(name) {
    this.promiseGetters = [];
    var makePromise = function () {
        var promiseObj = new Promise(function (resolve, reject) {
            console.log("Hi! This is " + name + "!");
            resolve();
        })
        return promiseObj;
    }
    this.promiseGetters.push(makePromise);
    // 在各个Promise的then函数中，将任务序列穿起来
    var self = this;
    // var sequence = Promise.resolve();
    setTimeout(function () {
        self.next();
    }, 0); // 在下一个事件循环启动任务
}

_LazyMan.prototype.next = function () {
    //shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
    var sequence = this.promiseGetters.shift();
    sequence && sequence();
}

_LazyMan.prototype.eat = function (name) {
    var makePromise = function () {
        var promiseObj = new Promise(function (resolve, reject) {
            console.log("Eat " + name + "~");
            resolve();
        })
        return promiseObj;
    }
    this.promiseGetters.push(makePromise);
    return this; // 实现链式调用
}

_LazyMan.prototype.sleep = function (time) {
    var makePromise = function () {
        var promiseObj = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("Wake up after " + time + "s!");
                resolve();
            }, time * 1000);
        })
        return promiseObj;
    }
    this.promiseGetters.push(makePromise);
    return this;
}

_LazyMan.prototype.sleepFirst = function (time) {
    var makePromise = function () {
        var promiseObj = new Promise(function (resolve) {
            setTimeout(function () {
                console.log('Wake up after ' + time + 's!');
                resolve();
            }, time * 1000);
        })
        return promiseObj;
    }
    this.promiseGetters.unshift(makePromise);
    return this;
}

//工具函数
function LazyMan(name) {
    return new _LazyMan(name);
}

LazyMan('Hank').sleep(2).eat('dinner').sleepFirst(5);