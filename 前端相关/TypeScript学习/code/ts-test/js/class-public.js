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
var Persons = /** @class */ (function () {
    function Persons(name) {
        this.name = name;
    }
    Persons.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Persons;
}());
var person = new Persons('lisi');
console.log(person.name); // 报错
console.log(person.run()); // lisi在吃饭
var Man = /** @class */ (function (_super) {
    __extends(Man, _super);
    function Man(name) {
        return _super.call(this, name) || this;
    }
    Man.prototype.eat = function () {
        return this.name + "\u5728\u5403\u996D"; // 报错
    };
    return Man;
}(Persons));
var man = new Man('男人');
// 先在子类自己中找对应的属性和方法，找不到再去父类中找
console.log(man.run()); // 男人在运动
console.log(man.eat()); // 男人在吃饭
console.log(man.name); // 报错
