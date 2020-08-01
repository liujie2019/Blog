class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    say() {
        return this.name;
    }
}

const p = new Person('lisi', 12);