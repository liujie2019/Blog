class Animal {
    constructor(name) {
       this.name = name;
    }
    getName() {
        return this.name;
    }
    static sayHello() {
        return 'hello';
    }
}

class Dog extends Animal {
    constructor(name, age) {
        super(name);//子类构造函数必须有super
        this.age = age;
    }
}

let dog = new Dog('xiaohua', 2);
console.log(dog.getName()); //xiaohua
console.log(dog.name); //xiaohua
console.log(Dog.sayHello()); //hello