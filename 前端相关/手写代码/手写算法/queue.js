/**
 * new Queue().task(1000,()=>console.log(1)).task(2000,()=>console.log(2)).task(3000,()=>console.log(3)).start()
*/

// class Queue {
//     constructor() {
//         this.tasks = [];
//     }
//     task(delay, cb) {
//         this.tasks.push(() => {
//             setTimeout(cb, delay);
//         });
//         return this;
//     }
//     start() {
//         this.tasks.forEach(cb => {
//             cb();
//         });
//     }
// }

// class Queue {
//     constructor() {
//         this.tasks = [];
//     }
//     task(delay, cb) {
//         this.tasks.push((resovle, reject) => {
//             setTimeout(() => {
//                 resovle(cb());
//             }, delay);
//         });
//         return this;
//     }
//     start() {
//         this.tasks.forEach(async cb => {
//             await new Promise(cb);
//         });
//     }
// }

class Queue {
    constructor() {
        this.tasks = [];
    }
    task(delay, cb) {
        this.tasks.push({cb, delay});
        return this;
    }
    start() {
        let time = 0;
        this.tasks.forEach(({cb, delay}) => {
            time += delay;
            setTimeout(cb, time);
        });
    }
}

// 要求1秒后输出1 再过2秒输出2 再过3秒输出3
// 相当于1秒后输出1 3秒后输出2 6秒后输出3
new Queue().task(1000, () => console.log(1)).task(2000, () => console.log(2)).task(3000, () => console.log(3)).start();


/**
 * 实现(5).add(3).minus(2),使其输出结果为6
*/
// 实现一个闭包
// ~function() {
//     // 每一个方法执行完，都要返回Number这个类的实例，这样才可以继续调用Number类原型中的方法(链式操作)
//     function checkNum(n) {
//         n = Number(n);
//         return isNaN(n) ? 0 : n;
//     }
//     function add(n) {
//         return this + n;
//     }
//     function minus(n) {
//         return this - n;
//     }
//     ['add', 'minus'].forEach(method => {
//         Number.prototype[method] = eval(method);
//     });
// }();

// console.log((5).add(3).minus(2)); // 6