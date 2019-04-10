var person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'lisi'
});
console.log(person.name); // lisi
delete person.name;
console.log(person.name); // lisi