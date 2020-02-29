function Animal() {}

let animal = new Animal();
console.log(animal);
console.log(Object.prototype.toString.call(animal)); // [object Object]

console.log(animal.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
console.log(animal.constructor === Animal); // true
console.log(Animal.prototype.constructor === Animal); // true
console.log('-------');
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype) === null); // true
let obj = new Object();
console.log(obj);
console.log(Object.prototype.toString.call(obj));