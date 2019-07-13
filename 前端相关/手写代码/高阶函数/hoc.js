// 判断类型 Object.prototype.toString.call()
// let a = 123;
// let s = Symbol();
// const fn = () => a + b;
// console.log(Object.prototype.toString.call(a)); // [object Number]

// 高阶函数
function isType(type) {
    return function (obj) {
        return Object.prototype.toString.call(obj).includes(type);
    };
}

const types = ['String', 'Object', 'Array', 'Null', 'Undefined', 'Boolean', 'Number', 'Symbol', 'Function'];
const util = {};
types.forEach(type => { // 批量生成方法
    util[`is${type}`] = isType(type);
});
const a = 123;
const fn = (a, b) => a + b;
console.log(util.isNumber(a));
console.log(util.isFunction(fn)); // true