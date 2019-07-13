let obj = {
    a: 1,
    b: 2
};

const p = new Proxy(obj, {
    get(target, key, value) {
        if(key in target) {
            return target[key]
        }
        else {
            return '自定义结果'
        }
    }
});

console.log(obj.a); // 1
console.log(obj.c); // undefined
console.log(p.a); // 1
console.log(p.c); // 自定义结果