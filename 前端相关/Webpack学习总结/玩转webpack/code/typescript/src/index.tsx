class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayName() {
        return `Hello, ${this.name}`;
    }
}

const p = new Person('lisi');
console.log(p.sayName());