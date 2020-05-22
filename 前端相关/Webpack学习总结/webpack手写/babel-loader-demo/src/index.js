class Animal {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        return this.name;
    }
}
const dog = new Animal('小黄111');
console.log(dog.sayName());