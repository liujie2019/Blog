// 生成器 Generator和迭代器Iterator

// 手写Generator
// read就是生成器，用来生成迭代器
function read(books) {
    let index = 0;
    // return的就是一个迭代器
    return {
        next() {
            // 只要能取到值done就为false，否则为true
            let done = index === books.length;
            let value = done ? undefined : books[index++];
            return {
                value,
                done
            }
        }
    }
}

// 迭代器
// 迭代器可以不停的调用next方法来得到一个结果{value, done}
// done为true时，表示迭代完成
let it = read(['js', 'node', 'css']);
// it有一个方法叫next，每次调用next都会返回一个结果{value, done}
// let r1 = it.next();
// console.log(r1); // { value: 'js', done: false }
// let r2 = it.next();
// console.log(r2); // { value: 'node', done: true }
// let r3 = it.next();
// console.log(r3); // { value: undefined, done: true }
let result;
do {
    result = it.next();
    console.log(result);
} while (!result.done);
/*
{ value: 'js', done: false }
{ value: 'node', done: false }
{ value: 'css', done: false }
{ value: undefined, done: true }
*/