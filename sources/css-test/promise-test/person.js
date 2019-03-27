function Person(name) {
    this.name = name;
}
const p = new Person('lisi');
console.log(p.__proto__); // Person {}
console.log(p.__proto__ === Person.prototype); // true
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.__proto__.__proto__ === Object.prototype); // true