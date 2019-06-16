const obj = {};

obj.a = 1;

Object.defineProperty(obj, 'b', {
    value: 2
});
console.log(obj);
console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
console.log(Object.getOwnPropertyDescriptor(obj, 'b'));