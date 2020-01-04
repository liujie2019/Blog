const keys = ['name', 'age'];
const values = ['lisi', 12];

const person = {
    [keys.shift()]: values.shift(),
    [keys.shift()]: values.shift()
};
console.log(person); // { name: 'lisi', age: 12 }