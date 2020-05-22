// freeze也是浅复制(对多层对象结构不起作用)

const obj = {
    a: 10,
    b: [1, 2]
};
const obj2 = Object.freeze(obj);
obj2.a = 20;
obj2.b.push(3);
console.log(obj2); // { a: 10, b: [ 1, 2, 3 ] }
console.log(obj); // { a: 10, b: [ 1, 2, 3 ] }