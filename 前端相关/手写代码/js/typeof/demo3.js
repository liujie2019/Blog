// 判断对象的数据类型
const isType = type => target => Object.prototype.toString.call(target) === `[object ${type}]`;
const isArray = isType('Array');
console.log(isArray([1, 2])); // true