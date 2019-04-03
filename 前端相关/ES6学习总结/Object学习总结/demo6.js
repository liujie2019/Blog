var person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'lisi'
});
Object.defineProperty(person, 'name', {
    writable: true,
    value: 'lisi'
});
console.log(Object.getOwnPropertyDescriptor(person, 'name'));