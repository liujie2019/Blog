const Immutable = require('immutable');
let obj1 = Immutable.Map({
    a: 1,
    b: 2,
    c: 3
});
let obj2 = obj1;
console.log(obj1 === obj2); //true

obj2 = obj2.set('b', 4);
console.log(obj1.get('b')); //2
console.log(obj2.get('b')); //4
console.log(obj1 === obj2); //false