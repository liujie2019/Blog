const { fromJS } = require('immutable');
const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });
console.log(nested);

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } })
console.log(nested2);