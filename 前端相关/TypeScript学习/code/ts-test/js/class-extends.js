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
var Parent = /** @class */ (function () {
    function Parent(name, age, skill) {
        this.name = name;
        this.age = age;
        this.skill = skill;
    }
    Parent.prototype.sayName = function () {
        return "\u6211\u53EB" + this.name;
    };
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.xingxiang = '很帅';
        return _this;
    }
    Child.prototype.work = function () {
        console.log('我热爱工作');
    };
    Child.prototype.sayName = function () {
        console.log(_super.prototype.sayName.call(this)); // 我叫lisi
        return '我是子类的方法';
    };
    return Child;
}(Parent));
var child = new Child('lisi', 12, '编程');
console.log(child.sayName()); // 我是子类的方法
child.work(); // 我热爱工作
