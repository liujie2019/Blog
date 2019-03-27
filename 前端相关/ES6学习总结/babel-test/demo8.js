const obj = {
    foo: 123,
    get bar() { return 'abc' }
};

console.log(Object.getOwnPropertyDescriptors(obj));