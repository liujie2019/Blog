// 生成器函数和普通函数长的不一样，返回迭代器
// 执行的时候也不一样

// 生成器函数其实是内部生成了若干个小函数

function *read(books) {
    for (let i = 0; i < books.length; i++) {
        yield books[i];
    }
    console.log('结束');
}

let it = read(['js', 'node']);
// let r1 = it.next();
// console.log(r1); // { value: 'js', done: false }
// let r2 = it.next();
// console.log(r2); // { value: 'node', done: false }
// let r3 = it.next();
// console.log(r3); // { value: undefined, done: true }
let res;
do {
    res = it.next();
    console.log(res);
} while (!res.done);
/*
{ value: 'js', done: false }
{ value: 'node', done: false }
结束
{ value: undefined, done: true }
*/