var person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'lisi'
});
console.log(Object.getOwnPropertyDescriptor(person, 'name'));