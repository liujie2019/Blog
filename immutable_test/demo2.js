const Immutable = require('immutable');
const obj1 = Immutable.Map({
    a: 1,
    b: 2,
    c: 3
});
const obj2 = Immutable.Map({
    a: 1,
    b: 2,
    c: 3
});
console.log(Immutable.is(obj1, obj2));