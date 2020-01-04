function makeIterator() {
    const that = this;
    let nextIndex = 0;
    console.log('使用自己的封装的迭代器');
    return {
        next() {
            const done = that.length === nextIndex;
            const value = done ? undefined : that[nextIndex++];
            return {
                value,
                done
            };
        }
    }
}

// Array.prototype[Symbol.iterator] = 123;
Array.prototype[Symbol.iterator] = makeIterator;

const arr = [1, 2, 3];
console.log(arr);
for (let i of arr) {
    console.log(i);
}

// for (let key in arr) {
//     console.log(key, typeof key); // key是字符串类型
//     // console.log(arr[key]);
// }
// for (let i of arr) {
//     if (i === 3) {
//         // continue;
//         // break;
//         return;
//     }
//     console.log(i); // 1, 2
// }