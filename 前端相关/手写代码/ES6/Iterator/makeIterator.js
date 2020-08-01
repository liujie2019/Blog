// 遍历器生成函数
function makeIterator(array) {
    let nextIndex = 0;
    // 返回一个遍历器对象
    return {
        next() {
            const done = nextIndex === array.length;
            const value = done ? undefined : array[nextIndex++];
            return {
                value,
                done
            }
        }
    }
}
// 对数组['a', 'b']执行这个函数，就会返回该数组的遍历器对象
const it = makeIterator(['a', 'b']);
let result;
do {
    result= it.next();
    console.log(result);
} while (!result.done);
/*
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: undefined, done: true }
*/


// 生成一个迭代器对象
// function makeIterator(arr) {
//     let nextIndex = 0;
//     return {
//         next() {
//             const done = nextIndex === arr.length;
//             const value = done ? undefined : arr[nextIndex++];
//             return {
//                 value,
//                 done
//             };
//         }
//     };
// }

let obj = {};

obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}

console.log([...obj]); // [ 1, 2, 3 ]

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

let it = foo();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
/**
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: 5, done: false }
{ value: 6, done: true }
{ value: undefined, done: true }
*/