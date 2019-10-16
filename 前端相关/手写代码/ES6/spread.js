// 解构赋值 结构相同，可以通过相同的结构来取值

const {length} = [1, 2, 3];
console.log(length); // 3
const [,b, c] = [1, 2, 3];
// 忽略个别值
console.log(b, c); // 2 3
// 剩余运算符
const [a, ...args] = [1, 2, 3];
console.log(a, args); // 1 [ 2, 3 ]

// 忽略第一个
let [, age] = ['lisi', 12];
console.log(age); // 12

// 剩余运算符只能用在最后一项，有收敛的功能，会把剩余的内容重新组装
let [, ...args] = ['lisi', 12, 13, 11];
console.log(args); // [ 12, 13, 11 ]

let {name, ...obj} = {name: 'liisi', age: 12, sex: 'man'};
console.log(obj); // { age: 12, sex: 'man' }

// 将类数组转为数组
function fn () {
    console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
    console.log([...arguments]); // [ 1, 2, 3 ]
}

fn(1, 2, 3);

// 展开运算符 剩余运算符
let arr = [1, 2, 3];
// 数组拷贝：展开运算符或者使用slice方法，都是浅拷贝
// let newArr = arr.slice(0);
let newArr = [...arr];
// Object.assign也是浅拷贝
console.log(arr === newArr); // false

let arr = [{name: 'lisi'}, 1, 2];
let newArr = [...arr];
// Object.assign也是浅拷贝
arr[0].name = 'wangwu';
console.log(arr, newArr); // [ { name: 'wangwu' }, 1, 2 ] [ { name: 'wangwu' }, 1, 2 ]



let obj = {name: 'lisi', age: 12};
const obj2 = JSON.parse(JSON.stringify(obj));
obj2.name = 'wangwu';
console.log(obj, obj2); // { name: 'lisi', age: 12 } { name: 'wangwu', age: 12 }

let obj = {name: 'lisi', age: 12, fn: function name() {}};
// 实现深拷贝
// JSON.parse(JSON.stringify(obj)); 纯对象没问题

const obj2 = JSON.parse(JSON.stringify(obj));
obj2.name = 'haha';
console.log(obj, obj2); // { name: 'lisi', age: 12 } { name: 'haha', age: 12 }
// 函数属性会丢失
// { name: 'lisi', age: 12, fn: [Function: name] } { name: 'haha', age: 12 }
