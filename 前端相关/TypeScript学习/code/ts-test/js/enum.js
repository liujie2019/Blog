"use strict";
var Flag;
(function (Flag) {
    Flag[Flag["succuss"] = 1] = "succuss";
    Flag[Flag["error"] = 2] = "error";
    Flag[Flag["undedined"] = -1] = "undedined";
    Flag[Flag["null"] = -2] = "null";
})(Flag || (Flag = {}));
// 指定s和e均为枚举类型
var s = Flag.succuss;
var e = Flag.error;
var u = Flag.undedined;
var n = Flag.null;
console.log(s, e, u, n); // 1 2 -1 -2
