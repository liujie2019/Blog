const {fromJS} = require('immutable');

const defaultConfig = fromJS({name: 'lisi', age: 18});
const config = defaultConfig.merge({name: 'wangwu'});

console.log(config); // Map { "name": "wangwu", "age": 18 }


var o = fromJS({a: [{a1: 1}, {b: [{t: 1}]}, {c1: 2}], b: 2, c: 3});
console.log(o);
o = o.setIn(['a', 1, 'b', 0, 't'], 100); // t赋值
console.log(o);
o = o.updateIn(['a', 1, 'b', 0, 't'], function(e){ return e * 100; }); // t * 100
console.log(o);

// 比较
// o1.equals(o2);