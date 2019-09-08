"use strict";
var A;
(function (A) {
    // 实现接口
    // 在外部使用需要export
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.eat = function () {
            return this.name + "\u5403\u5927\u9AA8\u5934";
        };
        return Dog;
    }());
    A.Dog = Dog;
    var Cat = /** @class */ (function () {
        function Cat(name) {
            this.name = name;
        }
        Cat.prototype.eat = function (food) {
            return this.name + "\u5403" + food;
        };
        return Cat;
    }());
    A.Cat = Cat;
    // let cat = new Cats('xiaohua');
    // console.log(cat.eats('黄花鱼')); // xiaohua吃黄花鱼
})(A || (A = {}));
var dogs = new A.Dog('xiaohuang');
console.log(dogs.eat());
