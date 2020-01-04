const objIterable = {};
objIterable[Symbol.iterator] = function* () {
    yield 'hello';
    yield 'world';
    yield 'end';
}

for (const i of objIterable) {
    console.log(i);
}

const obj = [...objIterable];
console.log(obj); // [ 'hello', 'world', 'end' ]
