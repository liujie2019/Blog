"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person1 = /** @class */ (function () {
    function Person1(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    Person1.prototype.sayName = function () {
        return "\u6211\u53EB" + this.name;
    };
    Person1.prototype.sayAge = function () {
        // 受保护属性age能在类内访问
        return "\u6211\u4ECA\u5E74" + this.age + "\u5C81";
    };
    return Person1;
}());
var person1 = new Person1('lisi', 12, '男');
console.log(person1.name);
console.log(person1.age); // 报错，受保护属性只能在类内和子类中访问
console.log(person1.sex); // 报错，私有属性只能在类内访问
console.log(person1.sayName());
console.log(person1.sayAge());
var Man1 = /** @class */ (function (_super) {
    __extends(Man1, _super);
    function Man1(name, age, sex) {
        return _super.call(this, name, age, sex) || this;
    }
    Man1.prototype.childSayAge = function () {
        // 受保护属性age能在子类中访问
        return "\u6211\u4ECA\u5E74" + this.age + "\u5C81\u4E86";
    };
    return Man1;
}(Person1));
var man1 = new Man1('男人', 13, '男');
console.log(man1.name);
console.log(man1.age); // 报错，受保护属性只能在类内和子类中访问
console.log(man1.sex); // 报错，私有属性只能在类内访问
console.log(man1.sayName());
console.log(man1.sayAge());
console.log(man1.childSayAge());
