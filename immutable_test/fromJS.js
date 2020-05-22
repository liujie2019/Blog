const {fromJS} = require('immutable');

const obj = fromJS({name: 'lisi', age: 12, hobbies: {
    arr: ['篮球']
}});
console.log(obj); // Map { "name": "lisi", "age": 12 }
// console.log(obj.get('name'));
console.log(obj.getIn(['hobbies', 'arr']));