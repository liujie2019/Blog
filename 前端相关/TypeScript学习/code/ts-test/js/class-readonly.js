"use strict";
var Man2 = /** @class */ (function () {
    function Man2() {
        this.name = 'lisi';
    }
    return Man2;
}());
var man2 = new Man2();
console.log(man2.name); // lisi
man2.name = 'wangwu'; // 报错，只读属性不能被修改
