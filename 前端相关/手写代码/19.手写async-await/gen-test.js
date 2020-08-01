const getData = () => new Promise((resovle, reject) => {
    setTimeout(() => {
        resovle('data');
    }, 1000);
});

function* testGen() {
    const data = yield getData();
    console.log('data111:', data);
    const data2 = yield getData();
    console.log('data222:', data2);
    return 'success';
}

// const gen = testGen();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

// 其实就是写一个自动执行generator函数的函数
// 基于generator实现async函数，接收一个generator函数
/**
 * @param  {any} genFn
 * @return
 */
function generatorToAsync(genFn) {
    return function() {
        const gen = genFn.apply(this, arguments);
        return new Promise((resovle, reject) => {
            function step(key, args) {
                let genResult;
                try {
                    genResult = gen[key](args);
                } catch (error) {
                    return reject(error);
                }
                const {done, value} = genResult;
                // 执行结束
                if (done) {
                    return resovle(value);
                } else {
                    return Promise.resolve(value).then(val => step('next', val), err => step('throw', err));
                }
            }
            step('next');
        });
    }
}

const test = generatorToAsync(testGen);
test().then(data => console.log(data));