// 递归拷贝
// hash = new WeakMap 解决循环引用问题
// WeakMap 弱引用，不能用Map，会导致内存泄露
function deepClone(value, hash = new WeakMap) {
    // 先把特殊情况全部过滤掉
    // null == undefined // true
    // 排除null和undefined
    if (value == null) { // null和undefined 是不需要拷贝的，直接返回
        return value;
    }
    if (value instanceof RegExp) { // 处理正则
        return new RegExp(value);
    }
    if (value instanceof Date) { // 处理日期
        return new Date(value);
    }
    // 函数是不需要拷贝的
    // 排除不是对象类型，包括函数和基本数据类型
    if (typeof value !== 'object') {
        return value;
    }
    // 根据constructor来区分对象和数组
    let obj = new value.constructor();
    // 说明是一个对象类型
    if (hash.get(value)) { // 有拷贝的就直接返回
        return hash.get(value);
    }
    hash.set(value, obj); // 制作一个映射表，解决循环拷贝问题
    // 区分对象和数组
    for (let key in value) {
        // 不拷贝原型链上的属性
        if (value.hasOwnProperty(key)) {
            // 递归拷贝
            obj[key] = deepClone(value[key], hash);
        }
    }
    return obj;
}
// let obj = {name: 'lisi', age: {num: 10}};
let obj = [[1, 2, 3]];
let obj1 = deepClone(obj);
// obj.age.num = 100;
console.log(obj); // { name: 'lisi', age: { num: 100 } }
// obj1.age.num = 1000;
console.log(obj1); // { name: 'lisi', age: { num: 1000 } }

let o = {};
o.x = o; // 循环引用，死循环了
let o1 = deepClone(o); // 如果这个对象拷贝过了，就返回那个拷贝的结果就可以了
console.log(o1); // RangeError: Maximum call stack size exceeded
// { x: [Circular] }

// 判断类型 typeof instanceof constructor
// Object.prototype.toString.call()


// 对象深拷贝需要注意的问题
// 1. 属性为函数
// 2. 属性为null或者undefined
// 3. 属性为Date
// 4. 属性为正则