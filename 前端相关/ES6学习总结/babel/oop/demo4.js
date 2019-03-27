function Foo() {}
Foo.prototype.a = 1;

var obj = new Foo();
obj.b = 2;
obj.c = 3;

// console.log(obj.a); //1
// console.log(obj.b); //2
// console.log(obj.c); //3
// console.log(typeof obj.toString); //function
// console.log('a' in obj); //true
// console.log(obj.hasOwnProperty('a')); //false

console.log(obj.__proto__ === Foo.prototype); // true
console.log(Foo.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true