const set = new Set().add(1).add(2).add(3);

console.log(set); // Set { 1, 2, 3 }
const [a, b] = set;
console.log(a, b); // 1 2

const [frist, ...rest] = set;
console.log(frist, rest); // 1 [ 2, 3 ]

const str = 'hello';
console.log([...str]); // [ 'h', 'e', 'l', 'l', 'o' ]

const arr = [1, 2];
console.log([3, ...arr, 4]); // [ 3, 1, 2, 4 ]