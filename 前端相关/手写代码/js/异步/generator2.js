function* gen(a) {
    let b;
    try {
        b = yield a + 1;
    } catch (error) {
        console.log(error); // 出错了
    }
    return b;
}

const g = gen(2);
console.log(g.next()); // { value: 3, done: false }
g.throw('出错了');