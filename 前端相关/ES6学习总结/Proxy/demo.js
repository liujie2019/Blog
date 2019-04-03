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

console.log(obj.a);
console.log(obj.c);
console.log(p.a);
console.log(p.c);