const obj = {name: 'lisi', other: {
    age: 12
}};
const obj2 = Object.assign({}, obj);
// console.log(obj2);
// obj.other.age = 13;
// { name: 'lisi', other: { age: 13 } } { name: 'lisi', other: { age: 13 } }
// console.log(obj, obj2);

obj2.other = 13;
// { name: 'lisi', other: { age: 12 } } { name: 'lisi', other: 13 }
console.log(obj, obj2);