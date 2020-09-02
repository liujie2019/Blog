/**
 * 防抖
*/

function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args);
        }, delay);
    }
}

function throttle(fn, delay) {
    let flag = true;
    return function(...args) {
        if (flag) {
            flag = false;
            setTimeout(() => {
                fn.call(this, ...args);
                flag = true;
            }, delay);
        }
    }
}

function throttle(fn, delay) {
    let start = Date.now();
    return function(...args) {
        let now = Date.now();
        if (now - start >= delay) {
            fn.call(this, ...args);
            start = Date.now();
        }
    }
}

function currying(fn) {
    let outerArgs = Array.from(arguments).slice(1);
    return function() {
        let innerArgs = Array.from(arguments);
        let args = [...outerArgs, ...innerArgs];
        // fn.length是函数需要的参数个数
        if (fn.length <= args.length) {
            return fn.call(this, ...args);
        } else {
            return currying(fn, ...args);
        }
    }
}

function add(a, b, c) {
    return a + b + c;
}

const curryingAdd = currying(add);

console.log(curryingAdd(1)(2)(4)); // 6
console.log(curryingAdd(1, 2)(3)) // 6
console.log(curryingAdd(1, 2, 3)) // 6
console.log(curryingAdd(1)(2, 3)) // 6

function sum() {
    let args = Array.from(arguments);
    function fn() {
        let innerArgs = Array.from(arguments);
        args = [...args, ...innerArgs];
        return arguments.callee;
    }
    fn.valueOf = function() {
        return args.reduce((accu, cur) => {
            return accu + cur;
        }, 0);
    }
    return fn;
}

console.log(sum(1, 2, 3, 4, 5).valueOf())
console.log(sum(1, 2, 3, 4)(5).valueOf())
console.log(sum(1, 2, 3, 4)(5).valueOf())
console.log(sum(1, 2)(3)(4)(5).valueOf())
console.log(sum(1, 2)(3, 4)(5).valueOf())

Array.prototype.myReduce = function(cb, initialValue) {
    let {length} = this; // 获取数组长度
    let res = initialValue;
    let startIndex = 0;
    if (!initialValue) {
        res = this[0]; // 如果没有传初始值，默认将数组第一个值作为初始值
        startIndex = 1;
    }
    for (let i = startIndex; i < length; i++) {
        // 每次迭代，reduce方法都将回调函数的结果保存在累加器中，然后在下一次迭代中使用
        res = cb(res, this[i], i, this);
    }
    return res;
}

const arr = [1, 2, 3, 4, 5];
// accumulator为初始值，没有初始值的话为数组的第一个元素
// accumulator为累加器
const res = arr.myReduce((accumulator, currentValue, currentIndex, sourceArray) => {
    return accumulator + currentValue;
});
const res2 = arr.myReduce((accumulator, currentValue, currentIndex, sourceArray) => {
    return accumulator + currentValue;
}, 10);

console.log(res); // 15
console.log(res2); // 25


Array.prototype.mySome = function(cb) {
    let {length} = this;
    for (let i = 0; i < length; i++) {
        if (cb(this[i])) {
            return true;
        }
    }
    return false;
}

const arr = [1, 2, 3, 4, 5];
console.log(arr.mySome(item => item > 3));

Array.prototype.myEvery = function(cb) {
    let {length} = this;
    for (let i = 0; i < length; i++) {
        if (!cb(this[i])) {
            return false;
        }
    }
    return true;
}

const arr = [1, 2, 3, 4, 5];
console.log(arr.myEvery(item => item > 1));


class Queue {
    constructor() {
        this.tasks = [];
    }
    task(delay, cb) {
        this.tasks.push({delay, cb});
        return this; // 支持链式调用
    }
    start() {
        let time = 0;
        if (this.tasks.length) {
            for (let i = 0; i < this.tasks.length; i++) {
                const {delay, cb} = this.tasks[i];
                time += delay;
                setTimeout(cb, time);
            }
        }
    }
}

// 要求1秒后输出1 再过2秒输出2 再过3秒输出3
new Queue().task(1000, () => console.log(1)).task(2000, () => console.log(2)).task(3000, () => console.log(3)).start();

let str = '10000000000';

function fn(str) {
    let res = '';
    let len = str.length - 1;
    let count = 0;
    while(len >= 0) {
        if (count === 3) {
            res = '.' + res;
            count = 0;
            continue;
        }
        res = str[len--] + res;
        count++;
    }
    return res;
}

console.log(fn(str));


function add() {
    let args = Array.from(arguments);
    function fn() {
        let innerArgs = Array.from(arguments);
        args.push(...innerArgs);
        return arguments.callee;
    }
    fn.value = function() {
        return args.reduce((accu, cur) => {
            return accu + cur;
        });
    }
    return fn;
}

console.log(add(1)(2, 3)(4, 5).value());


(function() {
    const util = {
        add(n) {
            return this + n;
        },
        minus(n) {
            return this - n;
        }
    };
    ['add', 'minus'].forEach(method => {
        Number.prototype[method] = util[method];
    });
})();
console.log((10).add(3).minus(2));

```js
// 原题如下：
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 
以此类推。
```
class CreateLazyMan {
    constructor(name) {
        this.name = name;
        this.queue = [];
        this.queue.push(() => {
            console.log(`Hi! this is ${this.name}`);
            this.next();
        });
        setTimeout(() => {
            this.next();
        }, 0);
    }
    next() {
        if (this.queue.length) {
            const cb = this.queue.shift(); // 先进先出
            cb();
        }
    }
    eat(food) {
        this.queue.push(() => {
            console.log(`Eat ${food}`);
            this.next();
        });
        return this;
    }
    sleep(time) {
        this.queue.push(() => {
            setTimeout(() => {
                this.next();
            }, 1000 * time);
        });
        return this;
    }
    sleepFirst(time) {
        this.queue.unshift(() => {
            setTimeout(() => {
                this.next();
            }, 1000 * time);
        });
        return this;
    }
}

function LazyMan(name) {
    return new CreateLazyMan(name);
}

// LazyMan('lisi').eat('dinner').eat('supper');
// LazyMan("Hank").sleep(3).eat("dinner");
LazyMan("Hank").sleepFirst(5).eat("supper")


