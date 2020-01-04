const obj = {name: 'lisi'};
const person = {name: 'wangwu'};

const p = {};

p[obj] = 10;
p[person] = 20;

console.log(p[obj]); // 20