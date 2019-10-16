const handler = {
    // 对设置属性进行拦截
    set: function(target, key, value, receiver) {
        if (key === 'name') {
            target[key] = receiver;
        } else {
            target[key] = value;
        }
    }
}

const proxy = new Proxy({}, handler);
const obj = {};
Object.setPrototypeOf(obj, proxy);

obj.name = 'lisi';
obj.age = 12;
console.log(obj.name === obj); // true
console.log(obj.age); // 12