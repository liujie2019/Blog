"use strict";
// 函数类型接口
// 实现接口
var Dogs = /** @class */ (function () {
    function Dogs(name) {
        this.name = name;
    }
    Dogs.prototype.eats = function () {
        return this.name;
    };
    return Dogs;
}());
var dog2 = new Dogs('xiaohuang');
console.log(dog2.eats());
var Cats = /** @class */ (function () {
    function Cats(name) {
        this.name = name;
    }
    Cats.prototype.eats = function (food) {
        return this.name + "\u5403" + food;
    };
    return Cats;
}());
var cat = new Cats('xiaohua');
console.log(cat.eats('黄花鱼')); // xiaohua吃黄花鱼
