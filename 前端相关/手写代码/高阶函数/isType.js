const types = ['Number', 'String','Object','Array','Null','Undefined','Boolean'];

const util = {};
const isType = type => obj => Object.prototype.toString.call(obj).includes(type);
types.forEach(type => {
    util[`is${type}`] = isType(type);
});

console.log(util.isString('test')); // true
console.log(util.isString(123)); // false