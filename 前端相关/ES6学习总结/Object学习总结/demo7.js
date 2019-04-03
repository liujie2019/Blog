var person = {};
Object.defineProperty(person, 'age', {
    configurable: true,
    writable: false,
    value: 'lisi'
});
Object.defineProperty(person, 'age', {
    writable: true,
    value: 'lisi'
});
console.log(Object.getOwnPropertyDescriptor(person, 'age'));