function myNew(fn, ...args) {
    if (typeof fn !== 'function') {
        throw new Error('newOperator function the first param must be a function');
    }
    myNew.target = fn;
    const obj = Object.create(fn.prototype);
    const res = fn.call(obj, ...args);
    // 如果构造函数返回函数或者对象，则返回对应的函数或者对象，而不是返回新创建的obj
    if ((typeof res !== null) && (typeof res === 'object' || typeof res === 'function')) {
        return res;
    }
    return obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    // return {name: '111'};
    // return function() {console.log(123)};
}

// const p = new Person('lisi', 12);
// console.log(p);

const p = myNew(Person, 'wangwu', 12);
console.log(p);