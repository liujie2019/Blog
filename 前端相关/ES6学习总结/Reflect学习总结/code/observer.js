const queue = new Set();
const person = {
    name: 'lisi',
    age: 12
};
function sayName() {
    console.log('发生变化了');
    console.log(`${person.name}----${person.age}`);
}
const handler = {
    set(target, key, value, receiver) {
        const res = Reflect.set(target, key, value, receiver);
        queue.forEach(observer => observer());
        return res;
    }
};

// 添加观察者
const observe = fn => queue.add(fn);
const observeable = obj => new Proxy(obj, handler);
observe(sayName);
const p = observeable(person);
p.name = 'wangwu';