function deepClone(target, hash = new WeakMap()) {
    if (target == null) { // 处理null和undefined
        return target;
    }
    if (typeof target !== 'object') {
        return target;
    }

    if (target instanceof RegExp) {
        return new RegExp(target);
    }
    if (target instanceof Date) {
        return new Date(target);
    }
    let obj = new target.constructor();
    if (hash.get(target)) {
        return hash.get(target); // 有拷贝的就直接返回
    }
    hash.set(target, obj); // 制作一个映射表，解决循环拷贝问题
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            obj[key] = deepClone(target[key], hash); // 递归拷贝
        }
    }

    return obj;
}

let obj = {name: 'lisi', age: {num: 10}};

let obj1 = obj;
let obj2 = deepClone(obj);

obj2.age.num = 1000;

console.log(obj)
console.log(obj1)
console.log(obj2) // { name: 'lisi', age: { num: 1000 } }

console.log(obj === obj1); // true
console.log(obj === obj2); // false