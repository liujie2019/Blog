const Immutable = require('immutable');
const Map1 = Immutable.fromJS({ a: 111, b: 222, c: { d: 333, e: 444 } });
const Map2 = Immutable.fromJS({ a: 111, b: 222, c: { e: 444, f: 555 } });

const Map3 = Map1.merge(Map2);
//Map {a:111,b:222,c:{e:444,f:555}}
const Map4 = Map1.mergeDeep(Map2);
//Map {a:111,b:222,c:{d:333,e:444,f:555}}
const Map5 = Map1.mergeWith((oldData, newData, key) => {
  if (key === "a") {
    return 666;
  } else {
    console.log(oldData);
    return newData;
  }
}, Map2);