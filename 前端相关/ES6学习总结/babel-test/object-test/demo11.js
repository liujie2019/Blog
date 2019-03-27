function Person() {
}
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends: ['lisi', 'wangwu'],
    sayName : function () {
        console.log(this.name);
    }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push('xiaohong');
console.log(person1.friends); // [ 'lisi', 'wangwu', 'xiaohong' ]
console.log(person2.friends); // [ 'lisi', 'wangwu', 'xiaohong' ]
console.log(person1.friends === person2.friends); // true