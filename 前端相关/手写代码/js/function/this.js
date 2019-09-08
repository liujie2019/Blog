let arr = [1, 2];
// Object.prototype.toString()方法返回一个表示该对象的字符串。
console.log(Object.prototype.toString.call(arr)); // [object Array]
// Array.prototype.toString()方法返回一个字符串，表示指定的数组及其元素。
console.log(arr.toString()); // 1,2