const Immutable = require('immutable');
console.log(Immutable);
const map1 = Immutable.Map({a: {d: {target: 1}}});
const map2 = Immutable.Map({a: {c: 1}});
const map3 = Immutable.merge(map1, map2);
console.log(map3);
console.log(map3.toJS());

// const map4 = Immutable.mergeDeep(map1, map2);
// console.log(map4);
// console.log(map4.toJS());