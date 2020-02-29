"use strict";
var str1 = '123';
var str2 = new String('test');
console.log(str1);
console.log(str2);
console.log(str1.length);
console.log(str2.length);
var t = true;
console.log(t);
var d = new Date();
console.log(d); // 2020-02-02T09:50:43.484Z
var d2 = new Date(1000);
var d3 = new Date(2000);
console.log(d2); // 1970-01-01T00:00:01.000Z
console.log(d3); // 1970-01-01T00:00:02.000Z
var d4 = new Date('2020/02/02 05:55:00');
var d5 = new Date('2020-02-02 05:55:00');
var d6 = new Date('2020-02-02T05:55:00');
console.log(d4); // 2020-02-01T21:55:00.000Z
console.log(d5); // 2020-02-01T21:55:00.000Z
console.log(d6); // 2020-02-01T21:55:00.000Z
var reg1 = new RegExp('testreg');
console.log(reg1); // /testreg
var stra = 'testreg.com';
var res = reg1.test(stra);
console.log(res);
var reg2 = new RegExp('testreg', 'gi');
var res2 = reg1.exec(stra);
console.log(res2); // [ 'testreg', index: 0, input: 'testreg.com' ]
console.log(reg2); // /testreg/gi
function run() {
    console.log(111);
}
console.log(run()); // undefined
