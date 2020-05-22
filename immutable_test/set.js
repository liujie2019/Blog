const {update, set} = require('san-update');

const obj = {name: 'lisi'};

console.log(set);
console.log(obj);
const obj2 = update(obj, {value: {$set: 2}});
const obj3 = set(obj, 'name', 'wangwu');
console.log(obj2); // { name: 'lisi', value: 2 }
console.log(obj3); // { name: 'wangwu' }