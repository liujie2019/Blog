class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    say() {
        console.log(`${this.name}--${this.age}`);
    }
}

const p = new Parent('lisi', 24);
p.say();

class Child extends Parent {
    constructor(name, age, hobbies) {
        super(name, age);
        this.hobbies = hobbies;
    }
    say() {
        console.log(`${this.name}--${this.age}--${this.hobbies}`);
    }
}
const c = new Child('wangwu', 12, '🏀');
c.say();