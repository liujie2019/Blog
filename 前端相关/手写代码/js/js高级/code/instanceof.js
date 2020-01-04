const obj = {
    arr: [123, 'test', console.log],
    fn: function() {
        console.log('111');
    }
}

console.log(obj instanceof Object, obj instanceof Array); // true false
console.log(obj.arr instanceof Array, obj.arr instanceof Object); // true true
console.log(obj.fn instanceof Function, obj.fn instanceof Object); // true true

console.log(typeof obj.fn); // 'function'
console.log(typeof obj.arr); // 'object'

// 初始赋值为null，表明将要赋值为对象。
let obj2 = null;
// 给对象赋值
obj2 = {name: 'lisi', age: 12};
// 让对象obj2指向的对象变为垃圾对象(被垃圾回收器回收)
obj2 = null;