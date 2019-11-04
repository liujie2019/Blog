function* testGenerator() {
    yield 'hello';
    yield 'world';
    return 'end';
}

const hw = testGenerator();
console.log(hw);
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());