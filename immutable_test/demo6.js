const Immutable = require('immutable');
const res = Immutable.fromJS([{ a: 3 }, { a: 2 }, { a: 4 }, { a: 1 }]).sortBy(
    (val, index, obj) => {
      console.log(val);
      return val.get("a");
    },
    (a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      if (a === b) {
        return 0;
      }
    }
);
// List [ Map { "a": 1 }, Map { "a": 2 }, Map { "a": 3 }, Map { "a": 4 } ]
console.log(res);