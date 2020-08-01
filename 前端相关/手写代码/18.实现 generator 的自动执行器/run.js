function func(data, cb) {
    console.log(data);
    console.log(cb); // next函数
    cb();
}

function* generatorTest() {
    let a = yield Promise.resolve(1);
    console.log(a);
    let b = yield Promise.resolve(2);
    console.log(b);
    yield func.bind(null, a + b);
}

function run(gen) {
    const g = gen();
    function next(data) {
        const result = g.next(data);
        // console.log(result);
        const {done, value} = result;
        if (done) return result.value;
        // console.log(result.value);
        if (value instanceof Promise) {
            value.then(data => next(data));
        } else {
            value(next);
        }
    }
    next();
}

run(generatorTest);
// const gen = generatorTest();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());