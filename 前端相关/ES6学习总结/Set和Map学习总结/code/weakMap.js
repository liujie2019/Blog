let obj = {name: 'lisi', age: 22};
let obj2 = {name: 'wangwu', age: 23};

const map = new Map();
const weakMap = new WeakMap();
map.set(obj2, '222');
weakMap.set(obj, '1111');

console.log(weakMap);
console.log(weakMap.size); // undefined

// WeakMap中的元素在没有引用的情况下，会被垃圾回收机制清除
obj = null;
obj2 = null;