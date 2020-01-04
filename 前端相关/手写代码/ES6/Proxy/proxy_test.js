const person = {
    name: 'lisi',
    age: 12
}

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

console.log(personProxy.name); // LISI
personProxy.hobbies = '    🏀     ';
console.log(personProxy.hobbies);