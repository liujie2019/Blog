import * as _ from 'lodash';

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayName() {
        return `Hello, ${this.name}`;
    }
}

// _.join();

const p = new Person('lisi');
console.log(p.sayName());