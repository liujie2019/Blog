// Symbol 基本数据类型，独一无二(永远不相等)

let s1 = Symbol(); // symbol中的标识一般放number或者string
let s2 = Symbol();
// symbol中可以增加标识
console.log(s1 === s2); // false

let s3 = Symbol('liujie'); // symbol中的标识一般放number或者string
let s4 = Symbol('liujie');

console.log(s3 === s4); // false

let obj = {
    name: 'lisi',
    [s2]: 1 // 对象的属性为Symbol类型的话，该属性不可枚举
}
console.log(obj); // { name: 'lisi', [Symbol()]: 1 }
console.log(obj[s2]);
console.log(s1 === s2); // false

for (let key in obj) {
    console.log(obj[key]);
}
console.log(Object.keys(obj)); // [ 'name' ]
// getOwnPropertySymbols获取对象中symbol类型的key
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol() ]

// 没有这个变量，就声明一个
let s5 = Symbol.for('liujie');
// 如果已经存在了，可以直接获取对应的symbol
// 所以s5和s6是相等的
let s6 = Symbol.for('liujie');

console.log(Symbol.keyFor(s5)); // liujie
console.log(s5 === s6); // true

// Symbol内置对象 Symbol.iterator 实现对象的遍历
// 实现元编程 可以对原生js的操作进行修改

let instance = {
    // 改写对象的instanceof方法
    [Symbol.hasInstance](value) {
        return 'a' in value;
    }
};
console.log({a: 1} instanceof instance); // true

let arr = [1, 2, 3];
// 设置在使用concat方法进行数组拼接时，不展开arr
arr[Symbol.isConcatSpreadable] = false;

console.log([].concat(arr, [1, 2, 3]));
/*
[ [ 1, 2, 3, [Symbol(Symbol.isConcatSpreadable)]: false ],
  1,
  2,
  3 ]
*/

// match split search
let obj = {
    [Symbol.match](value) {
        return value.length === 2;
    }
}
console.log('12'.match(obj)); // true

// species 衍生对象
class MyArray extends Array {
    constructor(...args) { // 先将类数组转为数组
        super(...args); // 再展开
    }
    // 强制修改一下
    // 使得arr2 instanceof MyArray为false
    // arr2 instanceof Array为true
    // 静态属性
    // 静态即属于类自己的
    static get [Symbol.species]() {
        return Array;
    }
}
let arr = new MyArray(1, 2, 3);
console.log(arr); // MyArray [ 1, 2, 3 ]
let arr2 = arr.map(item => item *= 2); // arr2是arr的衍生对象
console.log(arr2 instanceof MyArray); // false
console.log(arr2 instanceof Array); // true
// Symbol.species

// Symbol.toPrimitive
// 数据类型转化
let obj = {
    [Symbol.toPrimitive](type) {
        console.log(type); // number
        return;
    }
}

// console.log(obj++);
console.log(obj + '11'); // default

// Symbol.toStringTag

let obj = {
    [Symbol.toStringTag]: 'test'
}
console.log(Object.prototype.toString.call(obj)); // [object test]

// Symbol.unscopables

with({name: 1}){
    // with内部会以{name: 1}对象为this指向来取值
    console.log(name);
}

let arr = [];
console.log(arr[Symbol.unscopables]);
/*
{ copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  includes: true,
  keys: true }
  这些方法默认取不到，这些方法不在数组的作用域内
*/
with(arr){
    console.log(forEach); // [Function: forEach]
    console.log(findIndex); // ReferenceError: findIndex is not defined
}
// 模板引擎(ejs这些)就是用with语法实现的

// 常见的11种Symbol的应用