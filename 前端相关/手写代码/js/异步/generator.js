function* gen(a) {
    const b = yield a + 1;
    return b;
}

const g = gen(2);
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true }