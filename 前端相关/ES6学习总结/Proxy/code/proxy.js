const person = {
    name: 'lisi',
    age: 20
};

const personProxy = new Proxy(person, {
    get(target, key) {
        return target[key].toUpperCase();
    },
    set(target, key, value) {
        if (typeof value === 'string') {
            target[key] = value.trim();
        }
    }
});

personProxy.name = '  My name is wangwu   ';

console.log(person.name);
console.log(personProxy.name);