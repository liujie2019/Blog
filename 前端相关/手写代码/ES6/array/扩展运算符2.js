const person = [
    {name: 'lisi', age: 22},
    {name: 'wangwu', age: 23},
    {name: 'zhaoliu', age: 24}
];

const deleteIndex = person.findIndex(({name}) => name === 'wangwu');
console.log(deleteIndex); // 1
const newPersons = [...person.slice(0, deleteIndex), ...person.slice(deleteIndex + 1)];
console.log(newPersons); // [ { name: 'lisi', age: 22 }, { name: 'zhaoliu', age: 24 } ]
console.log(person); // [ { name: 'lisi', age: 22 },{ name: 'wangwu', age: 23 },{ name: 'zhaoliu', age: 24 } ]