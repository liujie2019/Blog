// require('@babel/polyfill');
// require('core-js/modules/es6.array.from');
// require('core-js/es6');
// require('core-js/es6/array');
// const obj = Object.assign({}, {name: 'lisi', age: 20});
// console.log(obj);
import '@babel/polyfill';
const arr = Array.from('foo');
console.log(arr);  // [ 'f', 'o', 'o' ]