// const a = 888;
// const b = new Number(888);
// const c = 888;
// console.log(a == b); // true
// console.log(a === b); // false
// console.log(b === c); // false


// const a = {};
// const b = {name: 'lisi'};
// const c = {name: 'wangwu'};
// a[b] = 666;
// a[c] = 888;

// console.log(a[b]); // 888

// const arr = [1, 2, 3];
// arr[10] = 123;
// console.log(arr); // (11) [1, 2, 3, empty × 7, 123]

// const obj1 = {
//     name: 'lisi',
//     print() {
//         return () => console.log(this.name);
//     }
// };

// const obj2 = {name: 'wangwu'};
// obj1.print()(); // lisi
// obj1.print().call(obj2); // lisi
// obj1.print.call(obj2)(); // wangwu

// const obj = {
//     1: 'a',
//     2: 'b'
// };
// const set = new Set([1, 2, 3]);
// console.log(obj.hasOwnProperty('1')); // true
// console.log(obj.hasOwnProperty(1)); // true
// console.log(set.has('1')); // false
// console.log(set.has(1)); // true

// function Foo() {
//     getName = function() {
//         console.log(1);
//     }
//     return this;
// }
// Foo.getName = function() {
//     console.log(2);
// }
// Foo.prototype.getName = function() {
//     console.log(3);
// }
// var getName = function() {
//     console.log(4);
// }
// function getName() {
//     console.log(5);
// }

// Foo.getName(); // 2
// getName(); // 4
// Foo().getName(); // 1
// getName(); // 1
// new Foo.getName(); // 2
// new Foo().getName(); // 3
// new new Foo().getName(); // 3

/**
script start
async1 start
async2
promise1
promise2
script end
nextTick
async1 end
promise3
setTimeout0
setImmediate
setTimeout3
 */
async function async1() {
    console.log('async1 start'); // 2
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start'); // 1

setTimeout(function() {
    console.log('setTimeout0');
}, 0);

setTimeout(function() {
    console.log('setTimeout3');
}, 3);

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick'));

async1();

new Promise((resolve) => {
    console.log('promise1');
    resolve();
    console.log('promise2');
}).then(() => {
    console.log('promise3');
});

console.log('script end');