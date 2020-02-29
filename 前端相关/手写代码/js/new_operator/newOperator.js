function newOperator(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new Error('newOperator function the first param must be a function');
    }
    newOperator.target = ctor;
    // 创建一个原型指向构造函数原型的新的对象
    const obj = Object.create(ctor.prototype);
    // 获取构造函数(ctor)的执行结果
    const res = ctor.call(obj, ...args);
    return res instanceof Object ? res : obj;
}
/**
1. 创建一个新的空对象。
2. 将构造函数的原型继承给这个空对象的隐式原型。
3. 在obj下执行构造函数，并传入参数，
   这个时候构造函数内的this就是obj。
4. 如果这个'构造函数'没有return对象格式的结果，
   返回新创建的obj。
*/
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function() {
    console.log(this.name);
}

const p = newOperator(Person, 'xiaoming', 22);
p.sayName();