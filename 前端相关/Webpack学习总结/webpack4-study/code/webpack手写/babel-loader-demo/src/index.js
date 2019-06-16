class Animal {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        return this.name;
    }
}
const dog = new Animal('小黄');
console.log(dog.sayName());