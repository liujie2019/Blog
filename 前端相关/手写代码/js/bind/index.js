let person = {
    name: 'lisi',
    sayName: function() {
        return this.name;
    }
};

let fn = person.sayName;
console.log(fn()); // undefined

let bindFn = fn.bind(person);
console.log(bindFn()); // lisi