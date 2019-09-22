import '@babel/polyfill';
require('./a');
let fn = () => {
    console.log(111);
};
@log
class Person {
    constructor(){}
}

function log(target) {
    console.log(target);
}
// const num = 45;
let arr = [1, 2, 3, 9];
// let arr2 = arr.map(item => item * item);

console.log(arr.includes(9));
// console.log('new Set(arr2) is ', new Set(arr2));