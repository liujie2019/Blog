// let arr = [1, 2, 3];

// for (let key in arr) {
//     console.log(key); // 0 1 2
//     console.log(arr.hasOwnProperty(key)); // true
//     console.log(arr.hasOwnProperty(4)); // false
// }

let obj = {a: 1, b: 'haha', c: [1, 2, 3], d: {name: 'lisi'}, e: new Date('2019-1-1'), f: new RegExp(/ab+c/)};

function deepClone(target, hash = new WeakMap()) {
    let type = typeof target;
    if (target == null) return target; // 处理null和undefine
    if (type !== 'object') {
        return target;
    }
    // 特殊处理日期，否则拷贝出来的日期不对
    if (target instanceof Date) {
        return new Date(target);
    }
    // 特殊处理正则
    if (target instanceof RegExp) {
        return new RegExp(target);
    }
    let res = new target.constructor();
    // 处理循环引用
    if (hash.has(target)) {
        return hash.get(target);
    }
    hash.set(target, res);
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            res[key] = deepClone(target[key], hash);
        }
    }
    return res;
}

let obj2 = deepClone(obj);
console.log(obj);
console.log(obj2);

obj2.d.name = 'wangwu';
obj2.c.push(4);
// console.log(obj2);
// console.log(obj);
