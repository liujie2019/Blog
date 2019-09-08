// 构造函数使用bind

function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function() {
    console.log(this.name);
}

const obj = {
    name: 'lisi',
    sayName() {
        console.log(this.name);
    }
}

const fn = new Person('wangwu').bind(obj);
console.log(fn);
