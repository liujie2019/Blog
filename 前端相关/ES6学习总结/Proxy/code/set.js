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
// 设置obj的原型是proxy
Object.setPrototypeOf(obj, proxy);

obj.name = 'lisi';
obj.age = 12;
console.log(obj.name === obj); // true
console.log(obj.age); // 12