import '@babel/polyfill';
let fn = () => {
    console.log(111);
};
const num = 45;
let arr = [1, 2, 3];
let arr2 = arr.map(item => item * item);

console.log(arr2.includes(9));
console.log('new Set(arr2) is ', new Set(arr2));