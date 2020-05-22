function myNewOperator (ctor) {
    if (typeof ctor !== 'function') {
        throw new Error('newOperator function the first param must be a function');
    }
    myNewOperator.target = ctor;
    const newObj = Object.create(ctor.prototype);
    const args = Array.prototype.slice.call(arguments, 1);
    const res = ctor.call(newObj, ...args);
    const isObject = typeof res === 'object' && res !== null;
    const isFunction = typeof res === 'function';
    if (isObject || isFunction) {
        return res;
    }
    return newObj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    // return 123;
    // return {};
}

const p = myNewOperator(Person, 'lisi', 12);
console.log(p); // Person { name: 'lisi', age: 12 }