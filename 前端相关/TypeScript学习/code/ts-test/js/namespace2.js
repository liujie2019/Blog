"use strict";
var shuaiGe;
(function (shuaiGe) {
    var Dehua = /** @class */ (function () {
        function Dehua() {
            this.name = '刘德华';
        }
        Dehua.prototype.talk = function () {
            console.log('我是帅哥刘德华');
        };
        return Dehua;
    }());
    shuaiGe.Dehua = Dehua;
})(shuaiGe || (shuaiGe = {}));
var bajie;
(function (bajie) {
    var Dehua = /** @class */ (function () {
        function Dehua() {
            this.name = '马德华';
        }
        Dehua.prototype.talk = function () {
            console.log('我是二师兄马德华');
        };
        return Dehua;
    }());
    bajie.Dehua = Dehua;
})(bajie || (bajie = {}));
var dehua1 = new shuaiGe.Dehua();
var dehua2 = new bajie.Dehua();
dehua1.talk(); // 我是帅哥刘德华
dehua2.talk(); // 我是二师兄马德华
