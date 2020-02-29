const url = require('url');

const obj = url.parse('www.baidu.com?name=lisi&age=20');
const obj2 = url.parse('www.baidu.com?name=lisi&age=20', true);
console.log(obj); // query: 'name=lisi&age=20'
console.log(obj2); // query: { name: 'lisi', age: '20' }