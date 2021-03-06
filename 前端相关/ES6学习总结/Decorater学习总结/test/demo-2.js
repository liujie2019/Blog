const Person = {
    name: 'lisi',
    sayName: function() {
        console.log(`My Name is ${this.name}`);
    }
};

const person = Object.create(Person);
person.sayName();
console.log(person.__proto__ === Person);
// 获取对象原型
console.log(Object.getPrototypeOf(person) === Person); // true
