function Foo() {}

var A = Object.create(Foo);
A.name = 'a';
var B = Object.create(A);
B.name = 'b';
var C = Object.create(B);
C.name = 'c';

let proto = C;
while (Object.getPrototypeOf(proto) !== null) {
    console.log(Object.getPrototypeOf(proto));
    proto = Object.getPrototypeOf(proto);
}

console.log(proto === Object.prototype); // true
var isPlain = Object.getPrototypeOf(C) === proto;
console.log(Object.getPrototypeOf(C) === B); // true
console.log(isPlain); // false