"use strict";
var SEX;
(function (SEX) {
    SEX[SEX["man"] = 0] = "man";
    SEX[SEX["woman"] = 1] = "woman";
    SEX[SEX["yao"] = 2] = "yao";
})(SEX || (SEX = {}));
;
console.log(SEX.woman); // 这里返回1，是索引index值，跟数组很像
// console.log(''.padStart(20, '-'));
// 可以使用=给枚举赋值
var SEX2;
(function (SEX2) {
    SEX2["man"] = "\u7537\u4EBA";
    SEX2["woman"] = "\u5973\u4EBA";
    SEX2["yao"] = "\u5996";
})(SEX2 || (SEX2 = {}));
;
console.log(SEX2.woman); // 女人
