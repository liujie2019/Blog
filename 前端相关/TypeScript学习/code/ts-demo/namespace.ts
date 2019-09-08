namespace ns1 {
    export class Person {
        public name: string = 'lisi';
        sayName() {
            console.log(this.name);
        }
    }
}
namespace ns2 {
    export class Person {
        public name: string = 'wangwu';
        sayName() {
            console.log(this.name);
        }
    }
}

let person1:ns1.Person = new ns1.Person();
let person2:ns1.Person = new ns2.Person();
person1.sayName(); // lisi
person2.sayName(); // wangwu