"use strict";
var ns1;
(function (ns1) {
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'lisi';
        }
        Person.prototype.sayName = function () {
            console.log(this.name);
        };
        return Person;
    }());
    ns1.Person = Person;
})(ns1 || (ns1 = {}));
var ns2;
(function (ns2) {
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'wangwu';
        }
        Person.prototype.sayName = function () {
            console.log(this.name);
        };
        return Person;
    }());
    ns2.Person = Person;
})(ns2 || (ns2 = {}));
var person1 = new ns1.Person();
var person2 = new ns2.Person();
person1.sayName(); // lisi
person2.sayName(); // wangwu
