function* generatorTest() {
    console.log('函数开始执行');
    let res = yield 'hello';
    console.log(res);
    console.log('函数继续执行');
    yield 'world';
}
function createPromise() {}
createPromise.__generatorFunction__ = generatorTest;
console.log(createPromise);

const gen = generatorTest();
console.log(gen.next());
console.log(gen.next('我是next传入的值'));
console.log(gen.next());