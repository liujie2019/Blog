// 实现一个简易迭代器
function makeIterator(arr) {
    let nextIndex = 0;
    // 返回一个迭代器对象
    return {
        // next方法返回一个结果对象
        next: () => {
            if (nextIndex < arr.length) {
                return {
                    value: arr[nextIndex++], done: false
                };
            } else {
                return {done: true};
            }
        }
    };
}
const it = makeIterator(['吃饭', '睡觉', '打游戏']);
// console.log('第一次', it.next().value);
// console.log('第二次', it.next().value);
// console.log('第三次', it.next().value);
// console.log('第四次', it.next().value);

function *genIterator(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}

// generator 生成器，方便使用迭代器
const gen = genIterator(['吃饭', '睡觉', '打游戏']);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
/**
{ value: '吃饭', done: false }
{ value: '睡觉', done: false }
{ value: '打游戏', done: false }
{ value: undefined, done: true }
*/