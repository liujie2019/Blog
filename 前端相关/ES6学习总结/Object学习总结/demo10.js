function Person() {
}
var friend = new Person();//调用构造函数创建实例，并向实例中添加一个指向最初原型的[[Prototype]]指针，而把原型重写修改后就等于切断了构造函数与最初原型之间的联系。
Person.prototype = {
    //这里重写原型对象切断了现有的原型与任何之前已经存在的对象实例之间的联系，之前的实例引用的仍然是最初的原型
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function () {
        console.log(this.name);
    }
};
friend.sayName(); // TypeError: friend.sayName is not a function
var person = new Person();
person.sayName(); // Nicholas