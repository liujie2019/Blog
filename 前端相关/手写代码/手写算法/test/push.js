/**
能不能改写一个数组的push方法，不是重写，也不是新写，保持原来的逻辑之外，再添加一个consle.log（arguements）在控制台打印出来，比如pushA。在工作台把A打印出来，push什么就打印什么。原来的逻辑不能改？
*/
let proto = Array.prototype;

let newProto = Object.create(proto);

const arr = [1, 2, 3];
newProto.push = function(...args) {
    console.log(...args); // 4
    proto.push.call(this, ...args);
}
// 设置数组的原型
Object.setPrototypeOf(arr, newProto);

arr.push(4);
console.log(arr); // [ 1, 2, 3, 4 ]