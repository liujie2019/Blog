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