"use strict";
var ns1;
(function (ns1) {
    class Person {
        constructor() {
            this.name = 'lisi';
        }
        sayName() {
            console.log(this.name);
        }
    }
    ns1.Person = Person;
})(ns1 || (ns1 = {}));
var ns2;
(function (ns2) {
    class Person {
        constructor() {
            this.name = 'wangwu';
        }
        sayName() {
            console.log(this.name);
        }
    }
    ns2.Person = Person;
})(ns2 || (ns2 = {}));
let person1 = new ns1.Person();
let person2 = new ns2.Person();
person1.sayName(); // lisi
person2.sayName(); // wangwu
