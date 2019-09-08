"use strict";
// 接口扩展，接口可以继承接口
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
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function () {
        return this.name + "\u7231\u5199\u4EE3\u7801";
    };
    return Programmer;
}());
// 继承类并实现接口
var Woman = /** @class */ (function (_super) {
    __extends(Woman, _super);
    function Woman(name) {
        return _super.call(this, name) || this;
    }
    Woman.prototype.eats = function () {
        return this.name + "\u7231\u5403\u7C73\u996D";
    };
    Woman.prototype.work = function () {
        return this.name + "\u7231\u5DE5\u4F5C";
    };
    return Woman;
}(Programmer));
var woman = new Woman('lisi');
console.log(woman.coding());
console.log(woman.eats());
console.log(woman.work());
