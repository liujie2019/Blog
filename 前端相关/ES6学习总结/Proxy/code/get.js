let obj = {
    name: 'lisi'
}

const p = new Proxy(obj, {
    get: function(target, key, receiver) {
        if (key in target) {
            return target[key];
        }
        else {
            throw new ReferenceError("Property \"" + key + "\" does not exist.");
        }
    }
});

console.log(p.name); // lisi
console.log(p.age); // ReferenceError: Property "age" does not exist.