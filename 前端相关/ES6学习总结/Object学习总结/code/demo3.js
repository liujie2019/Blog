var person = {};
Object.defineProperty(person, 'name', {
    writable: false,
    value: 'lisi'
});
console.log(person.name); // lisi
person.name = 'wangwu';
console.log(person.name); // lisi