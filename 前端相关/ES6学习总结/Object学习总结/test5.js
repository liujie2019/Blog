const Person = {
    name: 'lisi',
    age: 20
};
const obj = Object.create(Person);
console.log(obj instanceof Person);