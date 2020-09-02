//题目
var a = {num:2};
var b = Object.create(a);
//问题,以下顺序执行,值是？
console.log(b.num);
console.log(b.num++);
console.log(b.num);
console.log(a.num);