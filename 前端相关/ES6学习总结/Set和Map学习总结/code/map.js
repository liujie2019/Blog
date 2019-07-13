const map = new Map();

// map.set(['a'], 22);
// console.log(map.get(['a'])); //undefined

const arr = ['a'];
const value = '123';
map.set(arr, 22);
console.log(map.get(arr)); //22