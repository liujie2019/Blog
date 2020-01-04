const Person = (name, age) => {
    this.name = name;
    this.age = age;
}

const person = new Person('lisi', 12); // Uncaught TypeError: Person is not a constructor

const Person = function(name, age) {
    this.name = name;
    this.age = age;
}

const person = new Person('lisi', 12);
// console.log(person); // Person { name: 'lisi', age: 12 }
Person.prototype.sayName = () => {
    console.log(this.name); // undefined
};

person.sayName();

const Person = function(name, age) {
    this.name = name;
    this.age = age;
}

const person = new Person('lisi', 12);
// console.log(person); // Person { name: 'lisi', age: 12 }
Person.prototype.sayName = function() {
    console.log(this.name); // lisi
};

person.sayName();