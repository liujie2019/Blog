const Immutable = require('immutable');
foo = Immutable.fromJS({a: {b: 1}});
bar = foo.setIn(['a', 'b'], 2);
console.log(foo.getIn(['a', 'b']));
console.log(foo === bar);
